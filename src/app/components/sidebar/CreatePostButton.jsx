"use client";
import React from "react";
import { icons } from "@/app/utils/icons";
import useModal from "@/app/hooks/useModal";

const CreatePostButton = () => {
    const {open} = useModal();
  return (
    <button
        onClick={() => open("")}
      title="Post"
      className="filter hover:brightness-110 transition-all  h-14 bg-gradient-to-r from-accent-800 to-blue-600 m-4  text-white font-bold rounded-2xl text-lg"
    >
      <span className="hidden lg:block">Post</span>
      <span className="lg:hidden block">{icons.plus}</span>
    </button>
  );
};

export default CreatePostButton;
