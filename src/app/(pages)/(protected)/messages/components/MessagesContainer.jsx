"use client";
import { icons } from "@/app/utils/icons";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { io } from "socket.io-client";
import Message from "./Message";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";

const MessagesContainer = ({ id }) => {
  const { data, status } = useSession();
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [userLoading, getUser] = useTransition();
  const [disabled, setDisabled] = useState(true);
  const [messagesLoading, getMessages] = useTransition();
  const messagesContainer = useRef();
  useEffect(() => {
    setMessages([]);
    if (status == "authenticated" && id) {
      const sckt = io(process.env.NEXT_PUBLIC_MESSAGES_ENDPOINT);
      const roomId = [id, data.user._id].sort().toString().replace(",", "");

      setRoom(roomId);

      sckt.emit("join-room", roomId);

      setSocket((prev) => {
        prev && prev.disconnect();
        setMessages([]);
        return sckt;
      });

      getMessages(async () => {
        const res = await axios.post("/api/messages/get", {
          id1: id,
          id2: data.user._id,
        });
        const transformedMessages = [];
        res.data.messages.forEach((message) => {
          transformedMessages.push({
            content: message.content,
            self: message.by == data.user._id,
          });
        });
        setMessages(transformedMessages);
      });
    }
    if (id) {
      getUser(async () => {
        const res = await axios.post("/api/users/details", { id: id });

        setUser(res.data.user);
      });
    }
  }, [status, id]);
  useMemo(() => {
    if (socket) {
      socket.on("incoming-message", (message) => {
        setMessages((prev) => [
          ...prev,
          { content: message.content, self: false },
        ]);
      });
    }
  }, [socket]);
  useEffect(() => {
    messagesContainer?.current?.scrollTo(
      0,
      messagesContainer.current.scrollHeight
    );
  }, [messages]);

  async function handleSendMessage() {
    if (inputRef.current.value.length > 0) {
      const msg = inputRef.current.value;
      await socket.emit("message", { content: msg }, room);
      setMessages((prev) => [...prev, { content: msg, self: true }]);

      inputRef.current.value = "";
      await axios.post("/api/messages/create", {
        id1: data.user._id,
        id2: id,
        content: msg,
        by: data.user._id,
      });
      await socket.emit("trigger-revalidate", id.toString());
    }
  }
  function handleDisable(e) {
    {
      if (e.target.value.length > 0) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }
  return (
    <div className="w-full h-screen flex flex-col">
      {id ? (
        <>
          <div className="border-b border-grays-200 h-16 relative bg-[rgba(0,0,0,0.8)] backdrop-blur-lg z-40">
            {user && (
              <div className="size-full p-4 flex gap-2 items-center">
                <Image
                  className="size-10 rounded-full overflow-hidden"
                  width={50}
                  height={50}
                  src={user.avatar}
                  alt="avatar"
                ></Image>
                <span className="text-xl">{user.fullName}</span>
                <span className="text-xl text-grays-300">@{user.username}</span>
              </div>
            )}
          </div>
          {messages.length > 0 ? (
            <>
              <div
                ref={messagesContainer}
                className="size-full flex flex-col p-2 gap-1 overflow-y-scroll"
              >
                {messages.length > 0 &&
                  messages.map((message, index) => (
                    <Message self={message.self} key={index + message.content}>{message.content}</Message>
                  ))}
              </div>
            </>
          ) : (
            <>
            <div className="size-full flex items-center justify-center text-lg text-grays-300" >Nothing to show yet, why not start with a Hi</div></>
          )}

          <div className="flex w-full mt-auto relative border-t border-grays-200">
            <input
              type="text"
              placeholder="Enter message here"
              className="w-full p-4 bg-black outline-none "
              ref={inputRef}
              onChange={handleDisable}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              disabled={disabled}
              onClick={handleSendMessage}
              className={`size-16 shrink-0 bg-black rotate-180 border-r border-grays-200 hover:bg-accent-200 transition-colors disabled:text-grays-300 ${
                disabled && "pointer-events-none"
              }`}
            >
              {icons.arrow}
            </button>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center text-lg font-medium text-grays-300">
          No messages sent or received
        </div>
      )}
    </div>
  );
};

export default MessagesContainer;
