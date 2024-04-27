"use client"
import React, { useEffect, useRef } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import { createCA } from '@/src/utils/ca.js';
import * as twgl from 'twgl.js';

function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  var w = window.innerWidth || html.clientWidth;
  var h = window.innerHeight || html.clientHeight;
  return rect.top < h && rect.left < w && rect.bottom > 0 && rect.right > 0;
}

export function createDemo(canvas, modelName, W, H) {
    if (!canvas) return;
    /*
    const root = document.getElementById(divId);
    const canvas = $('#demo-canvas');
    const $ = q=>root.querySelector(q);
    const $$ = q=>root.querySelectorAll(q);
 	 */
    let demo;
    const modelDir = 'webgl_models8';
    let target = '🦎';
    let experiment = 'ex3';
    let paused = false;

    const gl = canvas.getContext("webgl");
    canvas.width = 576; // Adjusted from W*6 assuming W=96 as per your previous setting
    canvas.height = 576; // Adjusted from H*6

    function updateUI() {
    	/*
      $$('#pattern-selector *').forEach(e=>{
        e.style.opacity = e.id==target ? 1.0 : 0.2;
      });
      $$('#model-selector input').forEach(e=>{
        e.checked = e.id==experiment;
      });
      $$('#model-hints span').forEach(e=>{
        e.style.display = e.id.startsWith(experiment) ? "inline" : "none";
      });
      $('#play').style.display = paused? "inline" : "none";
      $('#pause').style.display = !paused? "inline" : "none";
      const speed = parseInt($('#speed').value);
      $('#speedLabel').innerHTML = ['1/60 x', '1/10 x', '1/2 x', '1x', '2x', '4x', '<b>max</b>'][speed+3];
      $("#rotationLabel").innerText = $('#rotation').value + '°';
    	*/
    }

    function initUI() {
      let spriteX = 0;
      for (let c of '🦎😀💥👁🐠🦋🐞🕸🥨🎄') {
        const div = document.createElement('div')
        div.id = c;
        div.style.backgroundPositionX = spriteX + 'px';
        div.onclick = ()=>{
          target = c;
          updateModel();
        }
        spriteX -= 40;
        //$('#pattern-selector').appendChild(div);
      }
      //$('#reset').onclick = demo.reset;
      /*$('#play-pause').onclick = ()=>{
        paused = !paused;
        updateUI();
      };*/
      /*
      $$('#model-selector input').forEach(sel=>{
        sel.onchange = ()=>{
          experiment = sel.id;
          
        }
      });*/
      	updateModel();
      //$('#speed').onchange = updateUI;
      //$('#speed').oninput = updateUI;
      //$('#rotation').onchange = updateUI;
      //$('#rotation').oninput = updateUI;

      function canvasToGrid(x, y) {
        const [w, h] = demo.gridSize;
        const gridX = Math.floor(x / canvas.clientWidth * w);
        const gridY = Math.floor(y / canvas.clientHeight * h);
        return [gridX, gridY];
      }
      function getMousePos(e) {
        return canvasToGrid(e.offsetX, e.offsetY);
      }
      function getTouchPos(touch) {
        const rect = canvas.getBoundingClientRect();
        return canvasToGrid(touch.clientX-rect.left, touch.clientY - rect.top);
      }
  
      let doubleClick = false;
      let justSeeded = false;
      function click(pos) {
        const [x, y] = pos;
        if (doubleClick) {
          demo.paint(x, y, 1, 'seed');
          doubleClick = false;
          justSeeded = true;
          setTimeout(()=>{ justSeeded = false; }, 100);
        } else {
          doubleClick = true;
          setTimeout(()=>{ 
            doubleClick = false; 
          }, 300);
          demo.paint(x, y, 8, 'clear');
        }
      }
      function move(pos) {
        const [x, y] = pos;
        if (!justSeeded) {
          demo.paint(x, y, 8, 'clear');
        }
      }

      canvas.onmousedown = e => {
        e.preventDefault();
        if (e.buttons == 1) {
          click(getMousePos(e));
        }
      }
      canvas.onmousemove = e => {
        e.preventDefault();
        if (e.buttons == 1) {
          move(getMousePos(e));
        }
      }
      canvas.addEventListener("touchstart", e=>{
        e.preventDefault();
        click(getTouchPos(e.changedTouches[0]));
      });
      canvas.addEventListener("touchmove", e=>{
        e.preventDefault();
        for (const t of e.touches) {
          move(getTouchPos(t));
        }
      });
      updateUI();
    }

    async function updateModel() {
      const r = await fetch(modelName);
      const model = await r.json();
      if (!demo) {
        demo = createCA(gl, model, [W, H]);
        initUI();        
        requestAnimationFrame(render);
      } else {
        demo.setWeights(model);
        demo.reset();

        
      }
      updateUI();
    }
    updateModel();
  
    let lastDrawTime = 0;
    let stepsPerFrame = 1;
    let frameCount = 0;
  
    function render(time) {

      if  (!isInViewport(canvas)) {
        requestAnimationFrame(render);
        return;
      }
  
      if (!paused) {
        const speed = 1;
        if (speed <= 0) {  // slow down by skipping steps
          const skip = [1, 2, 10, 60][-speed];
          stepsPerFrame = (frameCount % skip) ? 0 : 1;
          frameCount += 1;
        } else if (speed > 0) { // speed up by making more steps per frame
          const interval = time - lastDrawTime;
          stepsPerFrame += interval<20.0 ? 1 : -1;
          stepsPerFrame = Math.max(1, stepsPerFrame);
          stepsPerFrame = Math.min(stepsPerFrame, [1, 2, 4, Infinity][speed])
        }
        demo.setAngle(0);
        for (let i=0; i<stepsPerFrame; ++i) {
          demo.step();
        }
        demo.getStepCount();
        //$("#stepCount").innerText = demo.getStepCount();
        //$("#ips").innerText = demo.fps();

          // Chance to randomly paint a point
        if (Math.random() < 0.01) { // 10% chance to paint a point
            const x = Math.floor(Math.random() * W); // Random x-coordinate
            const y = Math.floor(Math.random() * H); // Random y-coordinate
            demo.paint(x, y, 1, 'seed');
        }

        }
      lastDrawTime = time;

      twgl.bindFramebufferInfo(gl);
      demo.draw();
      requestAnimationFrame(render);

      
    }
}

const LottieAnimation = ({ modelName, width, height }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // When the component mounts, and the ref is attached to the canvas, initialize the demo
        if (canvasRef.current) {
            createDemo(canvasRef.current, modelName, parseInt(width), parseInt(height));
        }

        // Cleanup function to handle component unmounting
        return () => {
            // Any necessary cleanup for your demo
        };
    }, []); // Ensure this runs once on mount

    return (
    <div className="flex items-center justify-center w-full h-full"> 
        <canvas ref={canvasRef} className="border-2 border-black dark:border-white"></canvas>
    </div>
);
};

export default LottieAnimation;