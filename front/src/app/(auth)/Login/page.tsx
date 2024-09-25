"use client";

import Login from "@/components/login/login";
import { ProfileContext } from "@/context/profile-context";

import { useContext, useState } from "react";

export default function Home() {
  const { handleLogForm, getCurrentUser } = useContext(ProfileContext);
  const handleLogIn = () => {
    getCurrentUser();
  };
  localStorage.removeItem("token");
  return (
    <div>
      <Login handleLogForm={handleLogForm} handleLogIn={handleLogIn} />
    </div>
  );
}
