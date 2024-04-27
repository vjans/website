import Image from 'next/image'
import React from 'react'
import profileCharacter from "../../../public/character.png"
import LottieAnimation from "@/src/components/Contact/LottieAnimation";

const AboutCoverSection = () => {
  return (
    <section className='w-full md:h-[75vh] border-b-2 border-t-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light'>
      <div className='w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center items-center overflow-hidden'>
          <LottieAnimation modelName="/victor.json" width="180" height="180"/>
      </div>

      <div className='w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16'>
          <h2 className='font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl text-center lg:text-left'>
          Hi, I'm Victor!
          </h2>
          <p className='font-medium capitalize mt-4 text-base'>
          I'm an AI masters student at JKU Linz. I love generative art and emergent systems. Scroll down to find more about me, or read some of my blog posts. I like to write about my projects and stuff that fascinates me.
          </p>
      </div>
    </section>
  )
}


export default AboutCoverSection