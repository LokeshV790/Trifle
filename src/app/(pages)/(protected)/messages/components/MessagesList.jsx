"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { icons } from "@/app/utils/icons";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import useToast from "@/app/hooks/useToast";
import { useSession } from "next-auth/react";

const User = ({ user, updateId,active, ...others }) => {
  function handleChangeUser() {
    updateId(user._id);
  }
  return (
    <button
      {...others}
      disabled={active}
      onClick={handleChangeUser}
      className={`hover:bg-[rgba(8,8,8)] transition-colors  p-4 flex text-left gap-2 ${active && "bg-accent-200 pointer-events-none"}`}
    >
      <Image
      alt="avatar"
        width={50}
        height={50}
        className="h-full aspect-square rounded-full overflow-hidden"
        src={user.avatar}
      ></Image>
      <div className="hidden lg:flex  flex-col justify-evenly h-full">
        <div className="flex flex-col gap-1 ">
          <span className="text-lg leading-4">{user.fullName}</span>
          <span className="text-lg leading-4 text-text-400">
            @{user.username}
          </span>
        </div>
        
      </div>
    </button>
  );
};

const MessagesList = ({ updateId, current, update }) => {
  const [revalidate, setRevalidate] = useState(0);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const { data, status } = useSession();
  const { notify } = useToast();
  const usernameRef = useRef();
  const [pending, getList] = useTransition();
  useEffect(() => {
    getList(async () => {
      if (status == "authenticated") {
        const res = await axios.post("/api/users/messages/getusers", {
          id: data.user._id,
        });
      
        // console.log(res.data.users);
        setUsers(res.data.users);
      }
    });
  }, [status, revalidate, update]);
  async function handleAddUser() {
    setOpen(false);
    const username = usernameRef.current.value;
    const res = await axios.post("/api/users/details", { username: username });
    if (res.data.user) {
      // setUsers((prev) => [
      //   {
      //     _id: res.data.user._id,
      //     username: res.data.user.username,
      //     fullName: res.data.user.fullName,
      //     avatar: res.data.user.avatar,
      //   },
      //   ...prev,
      // ]);
      await axios.post("/api/users/messages/adduser", {
        id: res.data.user._id,
        userId: data.user._id,
      });
      setRevalidate(Math.random())
      notify("User added successfully");
      updateId(res.data.user._id)
    } else {
      notify("Username invalid or user does not exist");
    }
  }
  function toggleOpen() {
    setOpen((prev) => {
      if (prev == false) {
        setTimeout(() => {
          usernameRef.current?.focus();
        }, 200);
      }
      return !prev;
    });
  }

  return (
    <div className="w-16 overflow-y-auto overflow-x-clip h-full  lg:w-[400px] shrink-0 transition-all   border-l border-grays-200 flex flex-col">
      <div className="border-b  sticky top-0  border-grays-200 p-4 h-16 text-2xl bg-[rgba(0,0,0,0.8)] backdrop-blur-lg z-40 flex flex-col">
        <div className="flex justify-between w-full h-full">
          <div>Messages</div>
          <button
            onClick={toggleOpen}
            className="h-full aspect-square rounded-lg transition-colors text-lg hover:bg-grays-100"
          >
            <div
              className={`${
                open ? "-rotate-45 text-heart_pink-200" : "rotate-0"
              } transition-all duration-700 ease-in-out`}
            >
              {icons.plus}
            </div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: "0", translateY: "-100%", opacity: 0 }}
            animate={{ height: "60px", translateY: "0%", opacity: 1 }}
            exit={{ height: "0", translateY: "-200%", opacity: 0 }}
            transition={{ type: "tween", ease: "circInOut", duration: 0.2 }}
            className="w-full overflow-hidden border-b border-grays-200 relative flex"
          >
            <input
              spellCheck="false"
              ref={usernameRef}
              type="text"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleAddUser();
                }
              }}
              placeholder="Enter username here"
              className=" h-full w-full p-4  bg-transparent outline-none"
            />
            <button
              onClick={handleAddUser}
              className="h-full aspect-square rotate-180 hover:bg-grays-100"
            >
              {icons.arrow}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col">
        {users.length > 0 ? (
          <>
            {users.map((user, index) => {
              return <User active={current==user._id} key={user._id} updateId={updateId} user={user}></User>;
            })}
          </>
        ) : (
          <div className="w-full flex justify-center items-center p-2 text-grays-300">
            No activity yet
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesList;
