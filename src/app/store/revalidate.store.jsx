"use client";
import { createContext, useState } from "react";

export const RevalidateContext = createContext();

export function RevalidateProvider({ children }) {
  const [postsRevalidation, setPostsRevalidation] = useState(1);
  function revalidatePosts() {
    setPostsRevalidation(Math.random() * 10000);
  }
  return (
    <RevalidateContext.Provider value={{ revalidatePosts, postsRevalidation }}>
      {children}
    </RevalidateContext.Provider>
  );
}
