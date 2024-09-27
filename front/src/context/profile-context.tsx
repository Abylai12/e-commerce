"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "@/utils/apiHome";
import { useState } from "react";

interface IUser {
  firstName: String;
  lastName: String;
  email: string;
  password: String;
  repassword: String;
}

interface ProfileContextType {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getCurrentUser: () => void;
  postUserData: () => void;
  verifyUserEmail: () => void;
  verifyUserOtp: (otp: string) => Promise<void>;
  setOtp: Dispatch<SetStateAction<string>>;
  otp: string;
  userForm: IUser;
  verifyUserPassword: (resetToken: string | null) => Promise<void>;
}
export const ProfileContext = createContext<ProfileContextType>({
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => {},
  getCurrentUser: () => {},
  postUserData: () => {},
  verifyUserEmail: () => {},
  setOtp: () => {},
  verifyUserOtp: async () => {},
  otp: "",
  userForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  },
  // verifyUserPassword: (resetToken: string) => {},
  verifyUserPassword: async (resetToken: string | null) => {},
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [userForm, setUserForm] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [otp, setOtp] = useState<string>("");
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
      if (password !== repassword) {
        return console.log("password don't match");
      }
      console.log("object", firstName);
      const newForm = { firstName, lastName, email, password };
      const res = await axios.post(`${apiURL}/logup`, newForm);

      if (res.status === 200) {
        toast.success("Customer created successfully:");
        router.push("/Login");
      } else {
        toast.error("Failed to create customer");
        console.error("Failed to create customer:");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.post(`${apiURL}/login`, userForm);
      console.log("first");
      if (res.status === 400) {
        console.log("burtgelgui hereglegsh bn");
      }
      if (res.status === 200) {
        const { token, user } = res.data;
        console.log("User successfully signed in", token);
        router.push("/dashboard");
        localStorage.setItem("token", token);
      } else {
        console.error("Failed customer:");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to sign in. Please try again.");
    }
  };
  const verifyUserEmail = async () => {
    const { email } = userForm;
    console.log("verify email", email);
    try {
      const res = await axios.post(`${apiURL}/verify/email`, { email });
      if (res.status === 400) {
        console.log("burtgelgui hereglegsh bn");
      }
      if (res.status === 200) {
        const { email } = res.data;
        router.push("/otp");
        console.log("burtgeltei hereglegsh bn", email);
      } else {
        console.error("Failed customer:");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to sign in. Please try again.");
    }
  };

  const verifyUserOtp = async (otp: string) => {
    try {
      const { email } = userForm;
      const res = await axios.post(`${apiURL}/verify/otp`, { otp, email });
      if (res.status === 400) {
        console.log("burtgelgui hereglegsh bn");
      }
      if (res.status === 200) {
        console.log("email ruu n link ilgeeleee");
      } else {
        console.error("Failed customer:");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to sign in. Please try again.");
    }
  };

  const verifyUserPassword = async (resetToken: string | null) => {
    try {
      const { password, repassword } = userForm;
      if (password !== repassword) {
        return console.log("password don't match");
      }
      const res = await axios.post(`${apiURL}/verify/password`, {
        password,
        resetToken,
      });
      if (res.status === 400) {
        console.log("tokenii hugatsaa duussan bn");
      }
      if (res.status === 200) {
        router.push("/Login");
        console.log("amjillttai shinechlegdlee");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to sign in. Please try again.");
    }
  };
  return (
    <ProfileContext.Provider
      value={{
        handleLogForm,
        postUserData,
        getCurrentUser,
        setOtp,
        otp,
        userForm,
        verifyUserEmail,
        verifyUserOtp,
        verifyUserPassword,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
