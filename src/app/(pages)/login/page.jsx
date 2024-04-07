"use client"
import { signIn } from "next-auth/react";
import React from "react";

const Button = ({ children, ...others }) => {
  return (
    <>
      <button {...others} className="p-4 bg-black hover:bg-grays-100 text-2xl font-semibold w-full flex justify-start rounded-2xl">
        {children}
      </button>
    </>
  );
};

const LoginPage = () => {
  return (
    <section className="size-full flex items-center justify-center">
      <div className="flex flex-col items-start w-1/5">
        <span className=" font-semibold px-4 mb-2">Login</span>
        <div className="flex flex-col w-full">
          <Button onClick={() => signIn("google", {callbackUrl: "/home"})} >Google</Button>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
