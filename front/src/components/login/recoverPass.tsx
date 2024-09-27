"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type LogInProps = {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
};
const RecoverPass = ({ handleLogForm, handleClick }: LogInProps) => {
  return (
    <div className="flex justify-center items-center w-full heightcalc">
      <div className="w-[334px] ">
        <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Input
            placeholder="Нууц үг"
            name="password"
            onChange={handleLogForm}
          />
          <Input
            placeholder="Нууц үг давтах"
            name="repassword"
            onChange={handleLogForm}
          />
          <ul className="list-disc">
            <li>Том үсэг орсон байх </li>
            <li>Жижиг үсэг орсон байх </li>
            <li>Тоо орсон байх</li>
            <li>Тэмдэгт орсон байх</li>
          </ul>
          <Button variant={"myBtn"} className="w-full" onClick={handleClick}>
            Үүсгэх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecoverPass;
