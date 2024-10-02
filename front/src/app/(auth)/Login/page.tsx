"use client";

import Login from "@/components/login/login";
import { ProfileContext } from "@/context/profile-context";

import { useContext, useState } from "react";

export default function Home() {
  const { handleLogForm, logInUser } = useContext(ProfileContext);
  const handleLogIn = () => {
    logInUser();
  };
  return (
    <div>
      <Login handleLogForm={handleLogForm} handleLogIn={handleLogIn} />
    </div>
  );
}
