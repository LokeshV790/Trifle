"use client"
import React from "react";
import { icons } from "@/app/utils/icons";

const BackToTop = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="h-16 p-4 flex justify-between">
      <span>You have reached the end of this page</span>
      <button
        onClick={scrollToTop}
        className="h-full aspect-square rounded-lg hover:bg-grays-100 transition-colors"
      >
        <div className="rotate-90">{icons.arrow}</div>
      </button>
    </div>
  );
};

export default BackToTop;
