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
  userForm: IUser;
  isLoading: boolean;
  verifyUserPassword: (resetToken: string) => Promise<Id | undefined>;
}
export const ProfileContext = createContext<ProfileContextType>({
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => {},
  getCurrentUser: () => {},
  postUserData: () => {},
  verifyUserEmail: () => {},
  verifyUserOtp: async () => {},
  userForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  },
  isLoading: false,
  // verifyUserPassword: (resetToken: string) => {},
  verifyUserPassword: async () => {},
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      toast.warning("Failed to sign in. Please try again.");
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
      toast.warning("Failed to sign in. Please try again.");
    }
  };
  const verifyUserEmail = async () => {
    const { email } = userForm;
    try {
      setIsLoading(true);
      const res = await axios.post(`${apiURL}/verify/email`, { email });
      if (res.status === 400) {
        return toast.error("Бүртгэлгүй хэрэглэгч бна");
      }
      if (res.status === 200) {
        router.push("/otp");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.warning("Failed to sign in. Please try again.");
      setIsLoading(false);
    }
  };

  const verifyUserOtp = async (otp: string) => {
    try {
      setIsLoading(true);
      const { email } = userForm;
      const res = await axios.post(`${apiURL}/verify/otp`, { otp, email });
      if (res.status === 400) {
        setIsLoading(false);
        return toast.warning(
          "Баталгаажуулах OTP код буруу байна. Та дахин илгээнэ уу"
        );
      }
      if (res.status === 200) {
        toast.success("Имейл хаяг руу холбоос илгээлэээ");
        router.push("/Login");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.warning("Failed to sign in. Please try again.");
      setIsLoading(false);
    }
  };

  const verifyUserPassword = async (resetToken: string) => {
    try {
      const { password, repassword } = userForm;
      if (password !== repassword) {
        return toast.warning("password don't match");
      }
      console.log("pass, token", password, resetToken);
      const res = await axios.post(`${apiURL}/verify/password`, {
        password,
        resetToken,
      });
      if (res.status === 400) {
        toast.warning("tokenii hugatsaa duussan bn");
      }
      if (res.status === 200) {
        toast.success("amjillttai shinechlegdlee");
        router.push("/Login");
      }
    } catch (error) {
      console.log(error);
      toast.warning("Failed to sign in. Please try again.");
    }
  };
  return (
    <ProfileContext.Provider
      value={{
        handleLogForm,
        postUserData,
        getCurrentUser,
        verifyUserEmail,
        verifyUserOtp,
        verifyUserPassword,
        userForm,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
