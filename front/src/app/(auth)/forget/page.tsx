import ForgetPass from "@/components/login/forgetPass";
import { ProfileContext } from "@/context/profile-context";
import React, { useContext } from "react";

const ForgetPassword = () => {
  const { handleLogForm } = useContext(ProfileContext);
  const handleLogIn = () => {};
  return (
    <div>
      <ForgetPass handleLogForm={handleLogForm} handleLogIn={handleLogIn} />
    </div>
  );
};

export default ForgetPassword;
