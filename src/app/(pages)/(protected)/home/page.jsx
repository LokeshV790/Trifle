"use client"
import TopBar from "./components/TopBar";
import CreatePost from "./components/CreatePost";
import Posts from "../components/Posts";

import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import { useState } from "react";
import useRevalidate from "@/app/hooks/useRevalidate";

function PostPage() {
  const {postsRevalidation} = useRevalidate();
  function revalidate(){
    setKey(Math.random()*1000)
  }
  return (
    <>
      <main className="size-full h-fit overflow-x-clip">
        <section className=" h-full">
          <TopBar></TopBar>
          <CreatePost ></CreatePost>
          <Posts infinite={true} key={postsRevalidation} endpoint="/api/posts/get" userid="" ></Posts>
          
        </section>
      </main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
}

export default PostPage;
