"use client";

import { createContext, Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Id, toast } from "react-toastify";
import { apiURL } from "@/utils/apiHome";
import { useState } from "react";
import { ILoggedUser, IPack, ISave, IUser } from "@/utils/interface";
import { ISaveProduct } from "@/components/detail/detailCart";

interface ProfileContextType {
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logInUser: () => void;
  verifyUserEmail: () => void;
  verifyUserOtp: (otp: string) => Promise<void>;
  getCurrentUser: () => void;
  setSearch: Dispatch<SetStateAction<string | null>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<ILoggedUser | null>>;
  setProductId: Dispatch<SetStateAction<string | null>>;
  setSaveList: Dispatch<SetStateAction<ISave[] | null>>;
  setPackList: Dispatch<SetStateAction<IPack[] | null>>;
  setTotalNumber: Dispatch<SetStateAction<number | null>>;
  setLocalProducts: Dispatch<SetStateAction<ISaveProduct[] | null>>;
  verifyUserPassword: (
    resetToken: string | null,
    formValues: IUser
  ) => Promise<Id | undefined>;
  productId: string | null;
  isLoading: boolean;
  user: ILoggedUser | null;
  search: string | null;
  saveList: ISave[] | null;
  packList: IPack[] | null;
  localProducts: ISaveProduct[] | null;
  userForm: IUser;
  totalNumber: number | null;
  refresh: boolean;
}
export const ProfileContext = createContext<ProfileContextType>({
  handleLogForm: () => {},
  logInUser: () => {},
  verifyUserEmail: () => {},
  verifyUserOtp: async () => {},
  getCurrentUser: () => {},
  setSearch: () => {},
  setRefresh: () => {},
  setUser: () => {},
  setSaveList: () => {},
  setPackList: () => {},
  setProductId: () => {},
  setTotalNumber: () => {},
  setLocalProducts: () => {},
  verifyUserPassword: async (resetToken: string | null) => {
    if (!resetToken) {
      return toast.warning("password don't match");
    }
  },
  productId: null,
  isLoading: false,
  user: null,
  search: null,
  saveList: null,
  packList: null,
  totalNumber: null,
  userForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  },
  refresh: false,
  localProducts: null,
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
  const [refresh, setRefresh] = useState<boolean>(false);

  const [search, setSearch] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [saveList, setSaveList] = useState<ISave[] | null>(null); //hadgalsan baraag setleh
  const [packList, setPackList] = useState<IPack[] | null>(null); //hadgalsan baraag setleh
  const [totalNumber, setTotalNumber] = useState<number | null>(null); //hadgalsan baraag setleh
  const [localProducts, setLocalProducts] = useState<ISaveProduct[] | null>(
    null
  );
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

  const logInUser = async () => {
    try {
      const res = await axios.post(`${apiURL}auth/login`, userForm);
      if (res.status === 400) {
        toast.warning("Бүртгэлтэй хэрэглэгч байна!");
      }
      if (res.status === 200) {
        const { token } = res.data;
        localStorage.setItem("token", token);
        setRefresh((prevRefresh) => !prevRefresh);
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
      const res = await axios.post(`${apiURL}auth/verify/email`, { email });
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
      const res = await axios.post(`${apiURL}auth/verify/otp`, { otp, email });
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
      const res = await axios.post(`${apiURL}auth/verify/password`, {
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
        setSaveList,
        setPackList,
        setTotalNumber,
        setRefresh,
        setLocalProducts,
        refresh,
        totalNumber,
        saveList,
        packList,
        productId,
        isLoading,
        user,
        search,
        userForm,
        localProducts,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
