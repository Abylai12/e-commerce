"use client";

import RecoverPass from "@/components/login/recoverPass";
import VerifyOtp from "@/components/login/verifyOtp";
import { ProfileContext } from "@/context/profile-context";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";

const RecoverPassword = () => {
  const { handleLogForm, verifyUserPassword } = useContext(ProfileContext);
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("resetToken");

  const handleClick = () => {
    console.log("reset token", resetToken);
    verifyUserPassword(resetToken);
  };
  return (
    <div className="flex flex-col justify-center items-center heightcalc ">
      <RecoverPass handleLogForm={handleLogForm} handleClick={handleClick} />
    </div>
  );
};

export default RecoverPassword;
