import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";

const AppBar = () => {

  return (
    <nav className="bg-black opacity-70 flex items-center p-3 text-white absolute w-full h-14 z-20">
      <img src="/images/logo.png" className="h-12" alt="Logo" />
      <LoginButton />
    </nav>
  );
};

export default AppBar;