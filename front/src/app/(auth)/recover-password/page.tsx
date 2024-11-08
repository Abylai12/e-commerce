"use client";

import RecoverPass from "@/components/login/recoverPass";
import { Suspense } from "react";
import React from "react";
function SearchBarFallback() {
  return <>placeholder</>;
}

const RecoverPassword = () => {
  return (
    <div className="flex flex-col justify-center items-center heightcalc ">
      <Suspense fallback={<SearchBarFallback />}>
        <RecoverPass />
      </Suspense>
    </div>
  );
};

export default RecoverPassword;
