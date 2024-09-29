"use client";

import React, { useContext } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ProfileContext } from "@/context/profile-context";
import Loader from "../loader/loader";

// type LogInProps = {
//   handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleClick: () => void;
// };

const ForgetPass = () => {
  const { handleLogForm, verifyUserEmail, isLoading } =
    useContext(ProfileContext);
  const handleClick = () => {
    verifyUserEmail();
  };
  return (
    <div className="flex justify-center items-center w-full heightcalc">
      {!isLoading ? (
        <div className="w-[334px] ">
          <h1 className="text-2xl font-semibold text-center">
            Нууц үг сэргээх
          </h1>
          <div className="flex flex-col gap-4 items-center mb-12 mt-6">
            <Input
              type="email"
              placeholder="Имейл хаяг"
              name="email"
              onChange={handleLogForm}
            />
            <Button
              variant={"myBtn"}
              className={` w-full`}
              onClick={handleClick}
            >
              Нэвтрэх
            </Button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ForgetPass;
