"use client";

import { Button } from "@/components/ui/button";
import UserInfoForm from "@/components/userInfo/userInfo";
import React, { useState } from "react";

const UserInfo = () => {
  const [type, setType] = useState<boolean>(true);

  return (
    <div className=" flex items-center justify-center heightcalc ">
      <div className="flex">
        <div className="flex flex-col gap-2 mr-4">
          <Button onClick={() => setType(true)}>Хэрэглэгчийн хэсэг</Button>
          <Button onClick={() => setType(false)}>Захиалгын түүх</Button>
        </div>
        {type ? (
          <UserInfoForm />
        ) : (
          <p className="w-[620px] h-[509px">Order form</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
