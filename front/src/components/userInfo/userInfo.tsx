"use client";

import React, { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { userSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ProfileContext } from "@/context/profile-context";
import { apiURL } from "@/utils/apiHome";

interface ILoggedUser {
  firstName: string;
  lastName: string;
  email: string;
}

const UserInfoForm = () => {
  const [user, setUser] = useState<ILoggedUser | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: "",
      address: "",
      profile_img: "",
    },
  });

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    console.log(values);
  };

  // const handleImageUpload = async () => {
  //   if (!image) return;
  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append("upload_preset", "byurziwm");

  //   try {
  //     const response = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
  //       formData
  //     );
  //     return response.data.secure_url;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };
  // const getCurrentUser = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const res = await axios.get(`${apiURL}/update/user`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (res.status === 200) {
  //       const { user } = res.data;
  //       setUser(user);
  //       console.log(user);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getCurrentUser();
  // }, [user]);
  return (
    <div className="w-[620px]">
      <h1 className="font-bold text-xl text-foreground">Хэрэглэгчийн хэсэг</h1>
      <div className="border-t border-gray-700 mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6  w-full"
          >
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Овог</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нэр</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имейл хаяг</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Утасны дугаар</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Хаяг</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile_img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Профайл зураг</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button variant={"myBtn"} type="submit">
                Мэдээлэл шинэчлэх
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserInfoForm;

{
  /* <div>
<Label>Овог:</Label>
<Input
  type="text"
  placeholder=""
  name="lastName"
  onChange={handleChange}
/>
<Label>Нэр</Label>
<Input
  type="text"
  placeholder=""
  name="firstName"
  onChange={handleChange}
/>
<Label htmlFor="email">Имейл хаяг</Label>
<Input
  type="email"
  placeholder=""
  name="email"
  onChange={handleChange}
/>
<Label htmlFor="number">Утасны дугаар</Label>
<Input
  type="number"
  placeholder="Email"
  name="phoneNumber"
  onChange={handleChange}
/>
<Label htmlFor="message">Хаяг</Label>
<Textarea placeholder="" onChange={handleChange} />
</div> */
}
