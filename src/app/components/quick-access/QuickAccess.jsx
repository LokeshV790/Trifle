"use client";
import { icons } from "@/app/utils/icons";
import React, { useState } from "react";

export function QuickAccessCard({children}) {
  return (
    <>
      <div className="overflow-hidden relative m-3 w-full bg-[rgb(10,10,10)] h-fit rounded-2xl p-4">
        {children}
      </div>
    </>
  );
}

function QuickAccess({ width, search = true, children }) {
  const [isFocused, setFocus] = useState(false);
  return (
    <div
      style={{ width: width }}
      id="quickaccess"
      className="fixed flex right-0  h-full sm:border-grays-200 border-0 sm:border-l transition-all"
    >
      {search && (
        <div className="w-full flex items-center h-12 m-4">
          <span
            className={`absolute mx-4 pointer-events-none transition-all ${
              isFocused ? "text-accent-900" : "text-grays-300"
            }`}
          >
            {icons.search}
          </span>
          <input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            spellCheck={false}
            type="text"
            placeholder="Search"
            className="transition-all placeholder:text-grays-300 placeholder:font-medium flex items-center pl-10 border-2 border-transparent focus:border-accent-900 focus:bg-background font-semibold size-full outline-none  bg-grays-800 rounded-full"
          />
        </div>
      )}
      {children}
    </div>
  );
}

export default QuickAccess;
