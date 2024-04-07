"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const usePopup = () => {
  const [isOpen, setOpen] = useState(false);
  function toggle() {
    setOpen((prev) => !prev);
  }
  function PopupWrapper({ children, content }) {
    return (
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="absolute  w-[90%] rounded-2xl top-0 -translate-y-full bg-black border border-grays-200 p-4"
          >
            {content}
          </motion.div>
        )}
        {children}
      </AnimatePresence>
    );
  }

  return { PopupWrapper, toggle };
};

export default usePopup;
