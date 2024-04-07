"use client";
import { useRef, useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "@/app/utils/icons";
import useModal from "@/app/hooks/useModal";

const gemini = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M86.67,50c0,.25-.18,.46-.43,.49-28.21,4.19-31.55,7.54-35.74,35.74-.04,.24-.25,.43-.49,.43s-.46-.18-.49-.43c-4.19-28.21-7.54-31.55-35.74-35.74-.24-.04-.43-.25-.43-.49s.18-.46,.43-.49c28.21-4.19,31.55-7.54,35.74-35.74,.04-.24,.25-.43,.49-.43s.46,.18,.49,.43c4.19,28.21,7.54,31.55,35.74,35.74,.24,.04,.43,.25,.43,.49Z" />
  </svg>
);

const variants = {
  open: {
    opacity: 1,
  },
  done: {
    bottom: 0,
  },
};

function QueryInput({ handleSubmit, done, pending, createPost }) {
  const {open} = useModal();
  const [clicked, setClicked] = useState(false);
  const query = useRef();
  const generateButton = useRef();
  function startSubmit(){
    setClicked(true);
    createPost();
  }
  function handleClick() {
    if (
      query.current.value &&
      query.current.value.trim() != "" &&
      query.current.value.length > 1
    ) {
      handleSubmit(query.current.value);
    }
  }
  return (
    <motion.div
      variants={variants}
      initial="open"
      animate={done && "done"}
      className={`absolute flex flex-col w-full px-10 overflow-hidden justify-center pb-10  transition-[padding] ${
        done && " px-4 pb-4"
      }`}
    >
      {done && (
        <div className="absolute size-20 w-1/2 opacity-10 -z-10 right-0 scale-150 bg-black blur-3xl"></div>
      )}
      {!done && <span className="text-xl">Enter a topic to write about</span>}
      <div className="flex gap-2 h-full pt-4">
        <div
          className="overflow-hidden relative cursor-text flex items-center resize-none w-full  bg-grays-100 rounded-2xl outline-none focus-within:bg-background focus-within:border-heart_pink-200 border border-transparent"
        >
          <input
            ref={query}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleClick()
              }
            }}
            placeholder="Example: Write a post about dogs"
            spellCheck="true"
            type="text"
            className="outline-none overflow-hidden whitespace-nowrap w-full text-wrap bg-transparent p-4"
          ></input>
        </div>

        <button
          ref={generateButton}
          disabled={pending}
          onClick={handleClick}
          title="generate post"
          className="[&_svg]:h-8 shrink-0 mt-auto h-14 disabled:fill-grays-300 [&_svg]:hover:animate-pulse disabled:bg-grays-100 [&_svg]:disabled:animate-pulse  hover:bg-heart_pink-200 hover:fill-grays-100 transition-all  aspect-square fill-heart_pink-200 flex items-center justify-center bg-grays-100 rounded-full"
        >
          {gemini}
        </button>

        {done && (
          <motion.button
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0, type: "spring", damping: 30 }}
            ref={generateButton}
            disabled={pending || clicked}
            title="create post"
            onClick={startSubmit}
            className=" shrink-0 mt-auto h-14 text-accent-900 disabled:text-gray-600 hover:text-white transition-colors disabled:fill-grays-300 overflow-hidden max-w-24 text-xl bg-accent-200 disabled:bg-grays-100 [&_*]:disabled:animate-pulse    hover:bg-violet-600 hover:fill-grays-100   fill-heart_pink-200 flex items-center justify-center gap-2 rounded-full"
          >
            {icons.plane} <span>Post</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default QueryInput;
