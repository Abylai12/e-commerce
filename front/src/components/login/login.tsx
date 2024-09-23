"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IUser {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  repassword: String;
}
const Login = ({
  isLog,
  isLogUp,
}: {
  isLog: string | undefined;
  isLogUp: string | undefined;
}) => {
  const router = useRouter();
  const [userForm, setUserForm] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const handleLogForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };
  const postUserData = async () => {
    try {
      const { firstName, repassword, lastName, email, password } = userForm;
      if (password === repassword) {
        const newForm = { firstName, lastName, email, password };
        const res = await fetch("http://localhost:8000/api/v1/auth/logup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newForm),
        });
        console.log("object", newForm);
        if (res.ok) {
          const data = await res.json();
          console.log("Customer created successfully:", data);
          router.push("/Login");
        } else {
          console.error("Failed to create customer:", res.statusText);
        }
      } else {
        console.log("password don't match");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const { email, password } = userForm;
      const user = {
        email,
        password,
      };
      console.log("user", user);

      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
      console.log("first");
      if (res.status === 404) {
        console.log("burtgelgui hereglegsh bn");
      }
      if (res.status === 200) {
        const { token } = await res.json();
        console.log("User successfully signed in");
        localStorage.setItem("token", token);

        router.push("/");
      } else {
        console.error("Failed customer:");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to sign in. Please try again.");
    }
  };
  const handleLogUp = () => {
    postUserData();
  };
  const handleLogIn = () => {
    getCurrentUser();
  };

  return (
    <div className="flex justify-center items-center w-full heightcalc">
      <div className="w-[334px] ">
        <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Input
            placeholder="Овог"
            className={`${isLog}`}
            name="lastName"
            onChange={handleLogForm}
          />
          <Input
            placeholder="Нэр"
            className={`${isLog}`}
            name="firstName"
            onChange={handleLogForm}
          />
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
          <Input
            placeholder="Нууц үг давтах"
            className={`${isLog}`}
            name="repassword"
            onChange={handleLogForm}
          />
          <ul className={`${isLog} list-disc`}>
            <li>Том үсэг орсон байх </li>
            <li>Жижиг үсэг орсон байх </li>
            <li>Тоо орсон байх</li>
            <li>Тэмдэгт орсон байх</li>
          </ul>
          <Button
            variant={"myBtn"}
            className={`${isLog} w-full`}
            onClick={handleLogUp}
          >
            Үүсгэх
          </Button>
          <Button
            variant={"myBtn"}
            className={`${isLogUp} w-full`}
            onClick={handleLogIn}
          >
            Нэвтрэх
          </Button>
          <Link href={"/"} className={`${isLogUp} hover:underline mb-2`}>
            Нууц үг солих
          </Link>
        </div>
        <Link
          href="/Logup"
          className={` ${isLogUp} bg-white flex justify-center text-black  border border-blue-700 rounded-2xl bg-primary w-full py-2 px-4`}
        >
          Бүртгүүлэх
        </Link>
        <Link
          href="/Login"
          className={` ${isLog} bg-white flex justify-center text-black  border border-blue-700 rounded-2xl bg-primary w-full py-2 px-4`}
        >
          Нэвтрэх
        </Link>
      </div>
    </div>
  );
};

export default Login;
