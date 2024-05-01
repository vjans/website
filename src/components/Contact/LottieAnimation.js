"use client"
import React, { useEffect, useRef, useState } from 'react';
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
    canvas.width = 960; // Adjusted from W*6 assuming W=96 as per your previous setting
    canvas.height = 960; // Adjusted from H*6

    function updateUI() {
    	
    }

    function initUI() {
      	updateModel();

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
  
    function render(time) {

      if  (!isInViewport(canvas)) {
        requestAnimationFrame(render);
        return;
      }
  
      if (!paused) {
        demo.step();
        demo.getStepCount();

          // Chance to randomly paint a point
        if (Math.random() > 0.9975 && modelName=='/victor.json') { // 10% chance to paint a point
            const x = Math.floor(Math.random() * W); // Random x-coordinate
            const y = Math.floor(Math.random() * H); // Random y-coordinate
            demo.paint(x, y, 1, 'seed');
        }

        }

      twgl.bindFramebufferInfo(gl);
      demo.draw();
      requestAnimationFrame(render);

      
    }
}

// Utility function to determine if the device is mobile
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const LottieAnimation = ({ modelName, width, height }) => {
    const canvasRef = useRef(null);
    const [loaded, setLoaded] = useState(false); // State to track if the animation has been loaded
    const [showCanvas, setShowCanvas] = useState(false); // State to control the rendering of the canvas

    useEffect(() => {
        // Delay the rendering of the canvas by 2 seconds
        const timer = setTimeout(() => {
            setShowCanvas(true);
        }, 1); // 2000 milliseconds delay

        return () => clearTimeout(timer); // Cleanup the timer
    }, []); // Empty dependency array ensures this runs once on mount

    useEffect(() => {
        if (!showCanvas || isMobile()) {
            // If it's not time to show the canvas or if on mobile, do not load the animation
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !loaded) {
                        createDemo(canvasRef.current, modelName, parseInt(width), parseInt(height));
                        setLoaded(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (canvasRef.current) {
            observer.observe(canvasRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [loaded, showCanvas]); // Depend on the 'loaded' and 'showCanvas' states

    return (
        <div className="flex items-center justify-center w-full h-full">
            {showCanvas && <canvas ref={canvasRef} className="border-2 border-black dark:border-white" width="960" height="960"></canvas>}
        </div>
    );
};

export default LottieAnimation;

