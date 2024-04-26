import {allBlogs} from "contentlayer/generated";
import HomeCoverSection from "@/src/components/Home/HomeCoverSection";
import FeaturedPosts from "@/src/components/Home/FeaturedPosts";
import RecentPosts from "@/src/components/Home/RecentPosts";

export default function Blog() {
  
  return (
    <main className="flex flex-col items-center justify-center">
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs} />


    </main>
  )
}

/*<HomeCoverSection blogs={allBlogs} />*/
