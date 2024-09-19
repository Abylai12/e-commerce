import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-[334px] ">
        <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Input placeholder="Нэр" />
          <Input placeholder="Имейл хаяг" />
          <Input placeholder="Нууц үг" />
          <Input placeholder="Нууц үг давтах" />
          <Button variant={"myBtn"} className="w-full">
            Нэвтрэх
          </Button>
          <Link href={"/"} className="hover:underline mb-2">
            Нууц үг солих
          </Link>
        </div>
        <Button
          variant={"outline"}
          className="bg-white text-black text-center w-full"
        >
          Бүртгүүлэх
        </Button>
      </div>
    </div>
  );
};

export default Login;
