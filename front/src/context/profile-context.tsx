"use client";

import { createContext, Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Id, toast } from "react-toastify";
import { apiURL } from "@/utils/apiHome";
import { useState } from "react";
import { headers } from "next/headers";

interface IUser {
  firstName: String;
  lastName: String;
  email: string;
  password: String;
  repassword: String;
}

interface ILoggedUser {
  firstName: string;
  lastName: string;
  email: string;
  profile_img: string;
}
interface ProfileContextType {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logInUser: () => void;
  logUpUser: (zodValue: IUser) => void;
  verifyUserEmail: () => void;
  verifyUserOtp: (otp: string) => Promise<void>;
  getCurrentUser: () => void;
  verifyUserPassword: (
    resetToken: string | null,
    formValues: IUser
  ) => Promise<Id | undefined>;
  isLoading: boolean;
  user: ILoggedUser | null;
}
export const ProfileContext = createContext<ProfileContextType>({
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => {},
  logInUser: () => {},
  logUpUser: (zodValue: IUser) => {},
  verifyUserEmail: () => {},
  verifyUserOtp: async (otp: string) => {},
  getCurrentUser: () => {},
  verifyUserPassword: async (resetToken: string | null, formValues: IUser) => {
    if (!resetToken) {
      return toast.warning("password don't match");
    }
  },
  isLoading: false,
  user: null,
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<ILoggedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  });
  // zod form

  const handleLogForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };
  const logUpUser = async (zodValue: IUser) => {
    try {
      const { firstName, lastName, repassword, email, password } = zodValue;
      if (password !== repassword) {
        return toast.error("Нууц үг хоорондоо нийцэхгүй байна");
      }

      const newForm = { email, password, firstName, lastName };
      const res = await axios.post(`${apiURL}/logup`, newForm);

      if (res.status === 200) {
        toast.success("Хэрэглэгч амжилттай бүртгэгдлээ");
        router.push("/Login");
      } else {
        toast.error("Бүртгэлтэй хэрэглэгч байна!");
      }
    } catch (error) {
      console.log("error", error);
      toast.warning("Failed to sign in. Please try again.");
    }
  };

  const logInUser = async () => {
    try {
      const res = await axios.post(`${apiURL}/login`, userForm);
      if (res.status === 400) {
        toast.warning("Бүртгэлтэй хэрэглэгч байна!");
      }
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        console.log("token", token);
        toast.success("User successfully signed in");
        router.push("/dashboard");
      } else {
        console.error("Failed customer:");
      }
    } catch (error) {
      console.log(error);
      toast.warning("Failed to sign in. Please try again.");
    }
  };
  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${apiURL}/get/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const { user } = res.data;
        setUser(user);
      }
    } catch (error) {
      console.log(error);
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
        toast.warning(
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

  const verifyUserPassword = async (
    resetToken: string | null,
    formValues: IUser
  ) => {
    try {
      const { password, repassword } = formValues;
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
  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    if (token) {
      getCurrentUser();
    } else {
      setToken(checkToken);
    }
  }, [token]);
  return (
    <ProfileContext.Provider
      value={{
        handleLogForm,
        logUpUser,
        logInUser,
        verifyUserEmail,
        verifyUserOtp,
        verifyUserPassword,
        getCurrentUser,
        isLoading,
        user,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
