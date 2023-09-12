
"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();
  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <div className="flex items-center">
          <p className="text-sky-600 font-bold  mr-2"> {session.user.name}</p>
          <button className="text-red-400 font-bold p-1 rounded-md hover:bg-black-900" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      ) : <></>}
    </div>
  );
};

export default LoginButton;