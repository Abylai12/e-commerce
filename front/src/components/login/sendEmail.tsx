"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type LogInProps = {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
};

const ForgetPass = ({ handleLogForm, handleClick }: LogInProps) => {
  return (
    <div className="flex justify-center items-center w-full heightcalc">
      <div className="w-[334px] ">
        <h1 className="text-2xl font-semibold text-center">Нууц үг сэргээх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Input
            type="email"
            placeholder="Имейл хаяг"
            name="email"
            onChange={handleLogForm}
          />
          <Button variant={"myBtn"} className={` w-full`} onClick={handleClick}>
            Нэвтрэх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
