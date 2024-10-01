"use client";

import RecoverPass from "@/components/login/recoverPass";
import { ProfileContext } from "@/context/profile-context";
import { useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";

const RecoverPassword = () => {
  return (
    <div className="flex flex-col justify-center items-center heightcalc ">
      <RecoverPass />
    </div>
  );
};

export default RecoverPassword;
