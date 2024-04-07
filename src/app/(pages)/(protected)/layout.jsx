import React from "react";
import Providers from "./components/Providers";
import SidebarHolder from "@/app/components/sidebar/SidebarHolder";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

async function ProtectedPages({ children }) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <Providers>
      <SidebarHolder></SidebarHolder>
      {children}
    </Providers>
  );
}

export default ProtectedPages;
