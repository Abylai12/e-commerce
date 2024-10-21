"use client";
import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const PayCard = ({
  setState,
}: {
  setState: Dispatch<SetStateAction<number>>;
}) => {
  const [countDown, setCountDown] = useState(900); // 15 minutes in seconds
  const handleClick = () => {
    setState(2);
  };

  useEffect(() => {
    if (countDown > 0) {
      const countdown = setInterval(() => {
        setCountDown((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [countDown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="bg-white w-[680px] p-4 rounded-2xl">
      <h1 className="font-bold text-xl">3. Төлбөр төлөх</h1>
      <div className="flex flex-col items-center gap-3">
        <p>{formatTime(countDown)}</p>
        <img src="/images/qpay.svg" alt="QPay logo" />
        <p>Төлөх боломжтой банкууд</p>
      </div>
      <Button onClick={handleClick}>Буцах</Button>
    </div>
  );
};

export default PayCard;
