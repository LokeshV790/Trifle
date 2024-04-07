"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

function Button({ active, children, ...others }) {
  return (
    <button
      {...others}
      className={`relative w-1/2 overflow-hidden flex justify-center items-center  ${
        active
          ? "font-bold"
          : "font-semibold hover:bg-[rgba(255,255,255,0.08)] text-text-500"
      }`}
    >
      <span className="z-10">{children}</span>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ y: "120%" }}
            animate={{ y: "0%" }}
            exit={{ y: "120%" }}
            transition={{ type: "tween", duration: 1.2 }}
            className="absolute -bottom-full blur-3xl opacity-85 w-1/2 h-16 bg-violet-600"
          ></motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function TopBar() {
  const [mode, setMode] = useState(0);
  return (
    <div className="sticky top-0 w-full h-16 border-b z-40 border-grays-200 bg-[rgba(0,0,0,0.9)] backdrop-blur-md h-14 flex text-text-900">
      <Button onClick={() => setMode(0)} active={mode === 0}>
        For You
      </Button>
      <Button onClick={() => setMode(1)} active={mode === 1}>
        Following
      </Button>
    </div>
  );
}

export default TopBar;
