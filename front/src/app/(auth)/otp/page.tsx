"use client";

import VerifyOtp from "@/components/login/verifyOtp";
import { ProfileContext } from "@/context/profile-context";
import React, { useContext, useState } from "react";

const OtpPage = () => {
  const { userForm, verifyUserOtp } = useContext(ProfileContext);
  const handleChange = (e: string) => {
    if (e.length === 4) {
      verifyUserOtp(e);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center heightcalc ">
      <VerifyOtp
        email={userForm.email.toString()}
        handleChange={handleChange}
      />
    </div>
  );
};

export default OtpPage;
