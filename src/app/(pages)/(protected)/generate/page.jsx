"use client";

import React, { useEffect, useState, useTransition } from "react";
import QueryInput from "./components/QueryInput";
import { generatePost } from "./util/generatePost";
import PostPreview from "./components/PostPreview";
import { AnimatePresence, motion } from "framer-motion";
import { icons } from "@/app/utils/icons";
import { createPostAction } from "@/app/mongodb/actions/post.actions";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";
import { QuickAccessCard } from "@/app/components/quick-access/QuickAccess";
import useToast from "@/app/hooks/useToast";
import useModal from "@/app/hooks/useModal";

const gemini = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px">
    <path d="M86.67,50c0,.25-.18,.46-.43,.49-28.21,4.19-31.55,7.54-35.74,35.74-.04,.24-.25,.43-.49,.43s-.46-.18-.49-.43c-4.19-28.21-7.54-31.55-35.74-35.74-.24-.04-.43-.25-.43-.49s.18-.46,.43-.49c28.21-4.19,31.55-7.54,35.74-35.74,.04-.24,.25-.43,.49-.43s.46,.18,.49,.43c4.19,28.21,7.54,31.55,35.74,35.74,.24,.04,.43,.25,.43,.49Z" />
  </svg>
);

const AiPage = () => {
  const { open } = useModal();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [response, setResponse] = useState(null);
  function handleSubmit(query) {
    startTransition(async () => {
      const result = await generatePost(query);
      if (result && result.trim() != "") {
        setResponse(result);
      }
    });
  }
  async function handleCreatePost() {
    open(response);
  }
  return (
    <>
      <main className="size-full flex flex-col items-center overflow-clip">
        <div className="relative h-14 w-full border-b border-grays-200 overflow-hidden flex items-center p-4 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 0.85, x: "0%" }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute z-10 bg-violet-600 size-8 w-1/2 blur-3xl"
          ></motion.div>
          <span className="text-2xl font-medium z-20 gap-2 flex">
            Let{" "}
            <span className="font-bold text-heart_pink-200 flex items-center">
              <span>AI</span>
              <span className="h-4 fill-heart_pink-200 [&_svg]:h-6 ">
                {gemini}
              </span>
            </span>{" "}
            write posts for you
          </span>
        </div>
        <div className="relative size-full flex justify-center flex-col overflow-hidden">
          <AnimatePresence>
            {pending && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 20 }}
                className="absolute bg-background rounded-xl border-2 border-grays-200 top-0 right-0 m-2 p-2 px-4 flex gap-2 justify-center items-center"
              >
                <div className="animate-spin">{icons.spinner}</div>
                <div className="">generating please wait</div>
              </motion.div>
            )}
            {response && (
              <>
                <div className="absolute mb-[120px] z-20 bg-gradient-to-t from-black to-transparent opacity-80 w-full bottom-0 h-12"></div>
                <PostPreview
                  content={response}
                  key={"post-preview"}
                ></PostPreview>
              </>
            )}
            <QueryInput
              pending={pending}
              key={"query-input"}
              handleSubmit={handleSubmit}
              done={response !== null || pending}
              createPost={handleCreatePost}
            ></QueryInput>
          </AnimatePresence>
        </div>
      </main>
      <QuickAccessHolder search={false}>
        <QuickAccessCard>
          <div className="absolute w-1/2 aspect-square bg-heart_pink-200 blur-3xl opacity-10"></div>
          <div className="relative m-0  bg-transparent">
            <h1 className="text-2xl font-semibold mb-2">Gemini</h1>
            <span className="text-lg">
              This page uses the google{" "}
              <a
                className="text-heart_pink-200 z-30  border-b-2 border-transparent hover:border-heart_pink-200 transition-all border-dashed "
                href="https://ai.google.dev/docs"
              >
                gemini api
              </a>{" "}
              to generate the post content
            </span>
          </div>
          <div className="absolute size-20 top-0  -z-10 bg-heart_pink-200"></div>
        </QuickAccessCard>
      </QuickAccessHolder>
    </>
  );
};

export default AiPage;
