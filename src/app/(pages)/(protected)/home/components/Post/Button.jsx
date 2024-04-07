"use client";
import React, { useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence, disableInstantTransitions } from "framer-motion";
import { icons } from "@/app/utils/icons";
import axios from "axios";
import { useSession } from "next-auth/react";

export function Button({
  icon,
  filled,
  hover,
  loading,
  repost,
  active,
  amount,
  id,
  isActive,
  ...others
}) {
  const [enabled, setEnabled] = useState(false);
  const [pending, startTransition] = useTransition();
  const { data, session } = useSession();
  const [updatedAmount, setAmount] = useState(amount)
  useEffect(() => {
    setEnabled(isActive);
  }, [isActive]);
  async function handleUpdate(e) {
    e.stopPropagation();
    if (others.title == "like") {
      startTransition(async () => {
        if (enabled === false) {
          const res = await axios.post("/api/posts/update/like", {
            id: repost ? repost : id,
            userId: data.user._id,
          });
          if (res.status === 200) {
            setAmount(res.data.likes)
            setEnabled(true);
          }
        } else {
          const res = await axios.post("/api/posts/update/unlike", {
            id: repost ? repost : id,
            userId: data.user._id,
          });
          if (res.status === 200) {
            setAmount(res.data.likes)
            setEnabled(false);
          }
        }
      });
    }
  }
  return (
    <>
    
      <button
      title={others.disabled && "a repost cannot be reposted"}
        disabled={pending}
        {...others}
        onClick={others.onClick || handleUpdate}
        className={`relative overflow-hidden w-full  rounded-lg  ${hover} ${
          enabled ? active : "text-gray-400"
        } ${others.disabled && "pointer-events-none"}`}
      >
        {(pending || loading) && (
          <div className="size-full absolute bg-loading animate-loading pointer-events-none opacity-50"></div>
        )}
        <div className="size-full p-2 flex gap-2 items-center">
          <AnimatePresence >
            {enabled ? (
              <>
                <motion.span
                  
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                    bounce: 20,
                  }}
                >
                  {filled ? filled : icon}
                </motion.span>
              </>
            ) : (
              <span>{icon}</span>
            )}
          </AnimatePresence>
          <span>
            {updatedAmount}
          </span>
        </div>
      </button>
    </>
  );
}
