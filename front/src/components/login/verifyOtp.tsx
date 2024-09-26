"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";

type OtpProps = {
  email: string;
  handleChange: (e: string) => void;
};
const VerifyOtp = ({ email, handleChange }: OtpProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <img src="./email.svg" alt="img" />
      <h1>Баталгаажуулах</h1>
      <p>
        <span>{email}</span> хаягт илгээсэн баталгаажуулах кодыг оруулна уу
      </p>
      <div className="flex">
        <InputOTP maxLength={4} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button>Дахин илгээх</Button>
    </div>
  );
};

export default VerifyOtp;
