import React from "react";
import { useContext } from "react";
import { ToastContext } from "../store/toast.store";

const useToast = () => {
  const { notify } = useContext(ToastContext);
  return { notify };
};

export default useToast;
