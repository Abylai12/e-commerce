"use client";

import ForgetPass from "@/components/login/sendEmail";
import { ProfileContext } from "@/context/profile-context";
import React, { useContext } from "react";

const ForgetPassword = () => {
  // const { handleLogForm, verifyUserEmail } = useContext(ProfileContext);
  // const handleClick = () => {
  //   verifyUserEmail();
  // };
  return (
    <div>
      <ForgetPass />
    </div>
  );
};

export default ForgetPassword;
