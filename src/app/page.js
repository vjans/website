import {allBlogs} from "contentlayer/generated";
import AboutCoverSection from "@/src/components/About/AboutCoverSection";
import Skills from "@/src/components/About/Skills";
import Timeline from "@/src/components/About/Timeline";
import FeaturedPosts from "@/src/components/Home/FeaturedPosts";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <AboutCoverSection />
      <Skills />
      <Timeline />
      <FeaturedPosts blogs={allBlogs} headingClassName="font-semibold text-lg sm:text-3xl md:text-4xl text-accent dark:text-accentDark font-bold text-accent dark:text-accentDark mb-2 text-center mt-4 sm:mt-8 md:mt-16" />
       <div className="mt-20" />
    </>
  );
}

/*<HomeCoverSection blogs={allBlogs} />*/
