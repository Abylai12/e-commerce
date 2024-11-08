"use client";

import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { ProfileContext } from "@/context/profile-context";
import { useContext } from "react";
import Loader from "../loader/loader";
import Image from "next/image";

// type OtpProps = {
//   email: string;
//   handleChange: (e: string) => void;
// };
const VerifyOtp = () => {
  const [countDown, setCountDown] = useState(30);
  const { userForm, verifyUserOtp, isLoading } = useContext(ProfileContext);
  const handleChange = (e: string) => {
    if (e.length === 4) {
      verifyUserOtp(e);
    }
  };

  const handleResendOtp = () => {
    setCountDown(30);
  };

  useEffect(() => {
    if (countDown > 0) {
      const countdown = setInterval(() => {
        setCountDown((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [countDown]);
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {!isLoading ? (
        <>
          <Image src="./email.svg" alt="img" />
          <h1>Баталгаажуулах</h1>
          <p>
            <span>{userForm.email}</span> хаягт илгээсэн баталгаажуулах кодыг
            оруулна уу
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
          <Button
            className="cursor-pointer text-muted-foreground mt-12 underline text-sm font-medium"
            onClick={handleResendOtp}
            variant="link"
          >
            Дахин илгээх ({countDown})
          </Button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default VerifyOtp;
