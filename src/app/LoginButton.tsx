"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();
  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <>
          <p className="text-sky-600Bane

￼Sign Out"> {session.user.name}</p>
          <button className="text-red-500" onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      ) : <></>}
    </div>
  );
};

export default LoginButton;