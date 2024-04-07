"use client";
import React from "react";
import { ToastProvider } from "@/app/store/toast.store";
import { ModalProvider } from "@/app/store/modal.store";
import { RevalidateProvider } from "@/app/store/revalidate.store";



const Providers = ({ children }) => {
  
  return (
    
      <RevalidateProvider>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </RevalidateProvider>
    
  );
};

export default Providers;
