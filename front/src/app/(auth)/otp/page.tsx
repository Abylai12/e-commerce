"use client";

import VerifyOtp from "@/components/login/verifyOtp";
import React, { useState } from "react";

interface IOtp {
  firstDigit: string;
  secondDigit: string;
  thirdDigit: string;
  fourthDigit: string;
}

const OtpPage = () => {
  const [otp, setOtp] = useState<IOtp>({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: "",
    fourthDigit: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtp({ ...otp, [name]: value });
  };
  console.log("object", otp);
  return (
    <div>
      <VerifyOtp email="@gmail.com" handleChange={handleChange} />
    </div>
  );
};

export default OtpPage;
