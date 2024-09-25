"use client";

import { createContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "@/utils/apiHome";
import { useState } from "react";

interface IUser {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  repassword: String;
}

// interface ProfileContextType {
//   handleLogForm: () => void;
//   getCurrentUser: (data: any) => Promise<void>;
//   postUserData: (data: any) => Promise<void>;
// }
export const ProfileContext = createContext({
  handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => {},
  getCurrentUser: () => {},
  postUserData: () => {},
  verifyUserEmail: () => {},
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
    try {
      const res = await axios.post(`${apiURL}/verify/email`, userForm);
      if (res.status === 400) {
        console.log("burtgelgui hereglegsh bn");
      }
      if (res.status === 200) {
        const { email } = res.data;
        console.log("burtgeltei herel=glesh bn");
        // router.push("/dashboard");
      } else {
        console.error("Failed customer:");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to sign in. Please try again.");
    }
  };
  return (
    <ProfileContext.Provider
      value={{ handleLogForm, postUserData, getCurrentUser, verifyUserEmail }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
