"use client";

import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
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
import Loader from "../loader/loader";
import { apiURL } from "@/utils/apiHome";
import { toast } from "react-toastify";

// const [image, setImage] = useState<string | null>(null);
const UserInfoForm = () => {
  const { user } = useContext(ProfileContext);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      profile_img: image,
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: "",
        address: "",
        profile_img: "",
      });
    }
  }, [user, form]);
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pisrslvb");

    try {
      console.log("check");
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData
      );
      setImage(response.data.secure_url);
      form.setValue("profile_img", response.data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };
  const updateUserData = async (values: z.infer<typeof userSchema>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Authentication token is missing. Please log in.");
      return;
    }
    try {
      const res = await axios.put(`${apiURL}update/profile`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success("Мэдээлэл амжилттай шинэчлэгдлээ");
      }
    } catch (error) {
      console.log("error", error);
      toast.warning("Failed to sign in. Please try again.");
    }
  };

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    console.log(values);
    updateUserData(values);
  };

  return (
    <div className="w-[620px]">
      <h1 className="font-bold text-xl text-foreground">Хэрэглэгчийн хэсэг</h1>
      <div className="border-t border-gray-700 mt-6">
        {user ? (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2  w-full"
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
                        <Input
                          type="file"
                          {...field}
                          accept="image/*"
                          onChange={(e) =>
                            e.target.files &&
                            handleImageUpload(e.target.files[0])
                          }
                        />
                      </FormControl>
                      {uploading && <p>Uploading...</p>}
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
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default UserInfoForm;
