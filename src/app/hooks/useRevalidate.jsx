"use client";

import { useContext } from "react";
import { RevalidateContext } from "../store/revalidate.store";

export default function useRevalidate () {
  const {revalidatePosts, postsRevalidation} = useContext(RevalidateContext);
  
  return {revalidatePosts, postsRevalidation}
};


