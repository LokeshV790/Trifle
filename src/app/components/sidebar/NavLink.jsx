"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

function NavLink({ children, icon, ...others }) {
  const [isActive, setActive] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === others.href) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);
  return (
    <Link
      {...others}
      className={`${isActive && "pointer-events-none"} shrink-0 overflow-hidden relative font-medium flex text-2xl gap-4 p-4 items-center justify-center lg:justify-normal border-y border-transparent   hover:bg-accent-200 transition-all`}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.1}} className="size-1/2 absolute bg-violet-600 -z-10 blur-3xl pointer-events-none right-0 bottom-0 scale-150"></motion.div>
        )}
      </AnimatePresence>
      <span
        className={
          isActive
            ? "text-white transition-colors text-lg"
            : "text-text-900 text-lg"
        }
      >
        {icon}
      </span>
      <span
        className={
          (isActive ? "font-bold " : "font-normal ") +
          "transition-all hidden lg:block"
        }
      >
        {children}
      </span>
    </Link>
  );
}

export default NavLink;
