
"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();
  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <>
          <p className="text-sky-600"> {session.user.name}</p>
          <button className="text-white rounded-md bg-green-700 hover:bg-green-900" onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      ) : <></>}
    </div>
  );
};

export default LoginButton;