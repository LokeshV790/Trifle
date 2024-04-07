"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import usePopup from "@/app/hooks/usePopup";

import React from "react";
import { useRouter } from "next/navigation";

const PopupContent = () => {
  const router = useRouter();
  return (
    <>
      <div className="size-full flex flex-col gap-2">
        <button className="p-2 hover:bg-grays-100 text-left px-4 rounded-xl" onClick={signOut}>Logout</button>
        <button className="p-2 hover:bg-grays-100 text-left px-4 rounded-xl" onClick={() => router.push("/profile")} >Profile</button>
      </div>
    </>
  );
};

const Profile = () => {
  const { PopupWrapper, toggle } = usePopup();
  const { data, status } = useSession();
  return (
    <div
      className="h-20 p-4 w-full flex items-center gap-2 cursor-pointer justify-center relative"
      onClick={toggle}
    >
      <PopupWrapper content={<PopupContent></PopupContent>}>
        <div className="h-full aspect-square rounded-full overflow-hidden grid place-items-center shrink-0">
          {status == "loading" ? (
            <>
              <div className="size-full bg-loading animate-loading"></div>
            </>
          ) : (
            <>
              <img src={data?.user?.image} className="size-full" alt="" />
            </>
          )}
        </div>
        <div className="flex flex-col justify-evenly leading-4 text-xl h-full w-full overflow-hidden rounded-lg">
          {status == "loading" ? (
            <>
              <div className="size-full bg-loading animate-loading "></div>
            </>
          ) : (
            <>
              <div className="font-semibold text-text-900">
                {data?.user?.name}
              </div>
              <div className="font-medium text-lg text-text-400">
                @{data?.user?.username}
              </div>
            </>
          )}
        </div>
      </PopupWrapper>
    </div>
  );
};

export default Profile;
