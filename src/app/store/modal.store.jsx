"use client";
import { createContext, useState } from "react";

import Modal from "../components/modal/Modal";
export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  function open(content, image, replyingTo) {
    console.log(replyingTo)
    setContent(content);
    setImage(image);
    setReplyingTo(replyingTo);
    setEnabled(true);
  }
  function close() {
    setImage(null);
    setEnabled(false);
    setContent("");
    setReplyingTo(null);
  }
  return (
    <ModalContext.Provider value={{ open }}>
      <Modal
        enabled={enabled}
        close={close}
        content={content}
        image={image}
        replyingTo={replyingTo}
      ></Modal>
      {children}
    </ModalContext.Provider>
  );
};
