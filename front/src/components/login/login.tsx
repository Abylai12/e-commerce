"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

type LogInProps = {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogIn: () => void;
};

const Login = ({ handleLogForm, handleLogIn }: LogInProps) => {
  return (
    <div className="flex justify-center items-center w-full heightcalc">
      <div className="w-[334px] ">
        <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Input
            type="email"
            placeholder="Имейл хаяг"
            name="email"
            onChange={handleLogForm}
          />
          <Input
            placeholder="Нууц үг"
            name="password"
            onChange={handleLogForm}
          />
          <Button variant={"myBtn"} className={` w-full`} onClick={handleLogIn}>
            Нэвтрэх
          </Button>
          <Link href="/forget" className={` hover:underline mb-2`}>
            Нууц үг солих
          </Link>
        </div>
        <Link
          href="/Logup"
          className={` bg-white flex justify-center text-black  border border-blue-700 rounded-2xl bg-primary w-full py-2 px-4`}
        >
          Бүртгүүлэх
        </Link>
      </div>
    </div>
  );
};

export default Login;
