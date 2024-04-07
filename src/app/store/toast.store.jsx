import { createContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { icons } from "../utils/icons";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [text, setText] = useState(null);
  const [enabled, setEnabled] = useState(false);
  function notify(text) {
    setEnabled(false);
    setTimeout(() => {
      setEnabled(true);
      setText(text);
      
    }, 100);
    console.log("this is supposed to be a notification");
  }
  useEffect(() => {
    if(enabled == true){
      setTimeout(() => {
        setEnabled(false)
        setText(null)
      }, 2000);
    }
  }, [enabled])
  return (
    <ToastContext.Provider value={{ notify }}>
      <AnimatePresence mode="sync">
        {enabled && (
          <motion.div 
            key={text || "notification"}
            initial={{ opacity: 0, scale: 1, y: "100%" }}
            animate={{ opacity: 1, scale: 1, y:"0%" }}
            exit={{ opacity: 0, scale: 1, y:"100%" }}
            transition={{ damping: 20, type: "spring" }}
            className="overflow-hidden bg-black border rounded-xl flex p-4 gap-2 items-center border-accent-900 min-w-48  m-2 fixed z-50 bottom-16 sm:bottom-0 right-0"
          >
            <div className="absolute -z-10 bg-accent-800 w-1/2 aspect-square blur-2xl opacity-20"></div>
            <button
              onClick={() => setEnabled(false)}
              className="p-2 hover:bg-[rgba(255,255,255,0.1)] [&_div]:hover:opacity-100 transition-all rounded-xl size-8 grid place-items-center"
            >
              <div className="rotate-45 grid place-items-center opacity-50 transition-all">
                {icons.plus}
              </div>
            </button>
            <span className="z-50">{text}</span>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </ToastContext.Provider>
  );
}
