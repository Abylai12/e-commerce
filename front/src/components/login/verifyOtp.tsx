"use client";

import React from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Input } from "../ui/input";

type OtpProps = {
  email: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const VerifyOtp = ({ email, handleChange }: OtpProps) => {
  return (
    <div>
      <img src="./email.svg" alt="img" />
      <h1>Баталгаажуулах</h1>
      <p>
        <span>{email}</span> хаягт илгээсэн баталгаажуулах кодыг оруулна уу
      </p>
      <div className="flex">
        <Input
          type="text"
          maxLength={1}
          className="w-[50px] h-[50px] text-center inline-block"
          name="firstDigit"
          onChange={handleChange}
        />
        <Input
          type="text"
          maxLength={1}
          className="w-[50px] h-[50px] text-center"
          name="secondDigit"
          onChange={handleChange}
        />
        <Input
          type="text"
          maxLength={1}
          className="w-[50px] h-[50px] text-center"
          name="thirdDigit"
          onChange={handleChange}
        />
        <Input
          type="text"
          maxLength={1}
          className="w-[50px] h-[50px] text-center"
          name="fourthDigit"
          onChange={handleChange}
        />
        {/* <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
        </InputOTP> */}
      </div>
    </div>
  );
};

export default VerifyOtp;
