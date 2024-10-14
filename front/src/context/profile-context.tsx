"use client";

import { createContext, Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Id, toast } from "react-toastify";
import { apiURL } from "@/utils/apiHome";
import { useState } from "react";
import { headers } from "next/headers";
import { ILoggedUser, IUser, Product, SaveProduct } from "@/utils/interface";

interface ISave {
  product_id: SaveProduct;
  _id: string;
}
interface ProfileContextType {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logInUser: () => void;
  verifyUserEmail: () => void;
  verifyUserOtp: (otp: string) => Promise<void>;
  getCurrentUser: () => void;
  setSearch: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<ILoggedUser | null>>;
  setProductId: Dispatch<SetStateAction<string | null>>;
  setList: Dispatch<SetStateAction<ISave[] | null>>;
  verifyUserPassword: (
    resetToken: string | null,
    formValues: IUser
  ) => Promise<Id | undefined>;
  productId: string | null;
  isLoading: boolean;
  user: ILoggedUser | null;
  search: string | null;
  list: ISave[] | null;
  userForm: IUser;
}
export const ProfileContext = createContext<ProfileContextType>({
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => {},
  logInUser: () => {},
  verifyUserEmail: () => {},
  verifyUserOtp: async (otp: string) => {},
  getCurrentUser: () => {},
  setSearch: () => {},
  setUser: () => {},
  setList: () => {},
  setProductId: () => {},
  verifyUserPassword: async (resetToken: string | null, formValues: IUser) => {
    if (!resetToken) {
      return toast.warning("password don't match");
    }
  },
  productId: null,
  isLoading: false,
  user: null,
  search: null,
  list: null,
  userForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  },
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

  const [search, setSearch] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [list, setList] = useState<ISave[] | null>(null); //hadgalsan baraag setleh

  const handleLogForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const logInUser = async () => {
    try {
      const res = await axios.post(`${apiURL}auth/login`, userForm);
      if (res.status === 400) {
        toast.warning("Бүртгэлтэй хэрэглэгч байна!");
      }
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        setToken(token);
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
      const res = await axios.get(`${apiURL}auth/get/profile`, {
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
      const res = await axios.post(`${apiURL}/auth/verify/email`, { email });
      if (res.status === 400) {
        return toast.error("Бүртгэлгүй хэрэглэгч бна");
      }
      if (res.status === 200) {
        router.push("/otp");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.warning("Failed to sign in. Please try again.");
      setIsLoading(false);
    }
  };

  const verifyUserOtp = async (otp: string) => {
    try {
      setIsLoading(true);
      const { email } = userForm;
      const res = await axios.post(`${apiURL}/auth/verify/otp`, { otp, email });
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
      const res = await axios.post(`${apiURL}/auth/verify/password`, {
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
    if (token) {
      getCurrentUser();
    } else {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);
  return (
    <ProfileContext.Provider
      value={{
        handleLogForm,
        logInUser,
        verifyUserEmail,
        verifyUserOtp,
        verifyUserPassword,
        getCurrentUser,
        setSearch,
        setUser,
        setProductId,
        setList,
        list,
        productId,
        isLoading,
        user,
        search,
        userForm,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
