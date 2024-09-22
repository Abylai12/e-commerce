import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const Login = ({ isLog }: { isLog: string | undefined }) => {
  return (
    <div className="flex justify-center items-center w-full heightcalc">
      <div className="w-[334px] ">
        <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Input placeholder="Нэр" className={`${isLog}`} />
          <Input placeholder="Имейл хаяг" />
          <Input placeholder="Нууц үг" />
          <Input placeholder="Нууц үг давтах" className={`${isLog}`} />
          <ul className={`${isLog}`}>
            <li>Том үсэг орсон байх </li>
            <li>Жижиг үсэг орсон байх </li>
            <li>Тоо орсон байх</li>
            <li>Тэмдэгт орсон байх</li>
          </ul>
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
