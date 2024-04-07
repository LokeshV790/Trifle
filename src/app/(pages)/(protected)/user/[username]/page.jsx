"use client";
import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";
import ProfilePage from "../../components/ProfilePage";
import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";

const UserProfilePage = ({ params }) => {
  const [pending, startTransition] = useTransition();
  const [user, setUser] = useState(null);
  useEffect(() => {
    startTransition(async () => {
      const res = await axios.post("/api/users/details", {
        username: params.username,
      });
      
      setUser(res.data.user);
    });
  }, []);
  return (
    <>
      <main className="size-full flex flex-col h-fit">
        {user && <ProfilePage user={user} status={true}></ProfilePage>}
      </main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
};

export default UserProfilePage;
