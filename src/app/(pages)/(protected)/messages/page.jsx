"use client";
import MessagesContainer from "./components/MessagesContainer";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import MessagesList from "./components/MessagesList";
import { useSession } from "next-auth/react";
import useToast from "@/app/hooks/useToast";

const MessagesPage = () => {
  const [id, setId] = useState(null);
  const {data, status} = useSession();
  const [listUpdate, setListUpdate] = useState(0);
  const {notify} = useToast();
  useEffect(() => {
    if(status == "authenticated"){
      const socket = io(process.env.NEXT_PUBLIC_MESSAGES_ENDPOINT);
      socket.emit("join-room", data.user?._id.toString())
      socket.on("revalidate", () => {
        setListUpdate(Math.random());
        notify("Someone sent you a message");
      })
    }
  }, [status])

  return (
    <main className="relative max-h-fit w-full flex overflow-hidden">
      <MessagesContainer id={id}></MessagesContainer>

      <div className="h-screen ">
        <MessagesList update={listUpdate} updateId={setId} current={id}></MessagesList>
      </div>
    </main>
  );
};

export default MessagesPage;
