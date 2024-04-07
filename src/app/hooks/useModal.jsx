"use client";
import { useContext } from "react";
import { ModalContext } from "../store/modal.store";

export default function useModal() {
  const { open } = useContext(ModalContext);

  
  return { open };
}
