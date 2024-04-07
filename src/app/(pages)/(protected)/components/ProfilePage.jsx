"use client";
import React, { useEffect, useState } from "react";
import { icons } from "@/app/utils/icons";
import Image from "next/image";
import Link from "next/link";
import Posts from "./Posts";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const modes = {
  0: "/api/posts/profile",
  1: "/api/posts/liked",
  2: "/api/posts/saved",
};

const Button = ({ mode, setMode, currentMode, children }) => {
  return (
    <button
      disabled={currentMode==mode}
      onClick={() => setMode(mode)}
      className={`h-full p-4 transition-all hover:bg-[rgb(8,8,8)] hover:text-white ${
        mode === currentMode ? "bg-grays-100 font-medium pointer-events-none" : "text-grays-300"
      }`}
    >
      {children}
    </button>
  );
};

const ProfilePage = ({ user, status }) => {
  const [mode, setMode] = useState(0);
  
  const router = useRouter();
  function handleNavigateBack(){
    router.back();
  }
  return (
    <>
      <div
        
        onClick={handleNavigateBack}
        className="sticky top-0 h-16 border-b hover:bg-[rgb(8,8,8)] transition-colors cursor-pointer border-grays-200 flex items-center gap-4 backdrop-blur-md bg-[rgba(0,0,0,0.9)] z-50"
      >
        <div className="z-20 ml-4">{icons.arrow}</div>
        <div className="flex h-full justify-center items-center gap-2 z-20 py-4">
          <span className="text-xl font-semibold leading-3">
            {user?.fullName}
          </span>
          <span className="text-text-400 font-semibold">@{user?.username}</span>
        </div>
      </div>
      <section className="flex flex-col size-full">
        <div className="h-44 flex flex-col p-4 border-b border-grays-200">
          {status != "loading" ? (
            <>
              <div className="overflow-hidden rounded-full size-fit">
                <Image
                  alt="profile picture"
                  src={user?.avatar}
                  width={50}
                  height={50}
                  className="size-20"
                ></Image>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-medium text-text-900">
                  {user?.fullName}
                </span>
                <span className="text-xl font-medium text-text-500">
                  @{user?.username}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="size-full overflow-hidden">
                <div className="p-4 size-full overflow-hidden rounded-2xl">
                  <div className="size-full bg-loading animate-loading"></div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="h-14 border-b border-grays-200 flex sticky top-14 backdrop-blur-md z-40 bg-[rgba(0,0,0,0.9)]">
          <Button mode={0} setMode={setMode} currentMode={mode}>
            Posts
          </Button>
          <Button mode={1} setMode={setMode} currentMode={mode}>
            Liked Posts
          </Button>
          <Button mode={2} setMode={setMode} currentMode={mode}>
            Saved Posts
          </Button>
        </div>
        {status != "loading" && (
          <Posts
            infinite={mode == 2 ? false : true}
            key={mode}
            endpoint={modes[mode]}
            userid={user?._id}
          ></Posts>
        )}
      </section>
    </>
  );
};

export default ProfilePage;
