"use client";

import VerifyOtp from "@/components/login/verifyOtp";
import { ProfileContext } from "@/context/profile-context";
import React, { useContext, useState } from "react";

const OtpPage = () => {
  const { setOtpEmail, verifyUserOtp } = useContext(ProfileContext);
  const handleChange = (e: string) => {
    setOtpEmail({ otp: e });
    if (e.length === 4) {
      verifyUserOtp();
      console.log("sendfunction");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center heightcalc ">
      <VerifyOtp email="@gmail.com" handleChange={handleChange} />
    </div>
  );
};

export default OtpPage;
