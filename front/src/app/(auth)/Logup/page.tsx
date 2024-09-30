"use client";

import Login from "@/components/login/login";
import { LogUp } from "@/components/login/logUp";
import { ProfileContext } from "@/context/profile-context";
import React, { useContext } from "react";

const Logup = () => {
  const { handleLogForm, postUserData } = useContext(ProfileContext);
  const handleLogUp = () => {
    postUserData();
  };
  return (
    <div>
      <LogUp handleLogForm={handleLogForm} handleLogUp={handleLogUp} />
    </div>
  );
};

export default Logup;
