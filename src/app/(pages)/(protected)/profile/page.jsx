"use client";
import React from "react";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";

import { useSession } from "next-auth/react";
import ProfilePage from "../components/ProfilePage";

const Profile = () => {
  const { data, status } = useSession();
  return (
    <>
      <main className="size-full flex flex-col h-fit">
        <ProfilePage
          user={{
            avatar: data?.user?.image,
            fullName: data?.user?.name,
            username: data?.user?.username,
            _id: data?.user?._id,
          }}
          status={status}
        ></ProfilePage>
      </main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
};

export default Profile;
