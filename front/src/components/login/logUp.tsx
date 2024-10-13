"use client";

import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IUser } from "@/utils/interface";
import { toast } from "react-toastify";
import axios from "axios";
import { apiURL } from "@/utils/apiHome";
import { useRouter } from "next/navigation";

export const LogUp = () => {
  const router = useRouter();
  const logUpUser = async (zodValue: IUser) => {
    try {
      const { firstName, lastName, repassword, email, password } = zodValue;
      if (password !== repassword) {
        return toast.error("Нууц үг хоорондоо нийцэхгүй байна");
      }

      const newForm = { email, password, firstName, lastName };
      const res = await axios.post(`${apiURL}/auth/logup`, newForm);

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

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    logUpUser(values);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repassword: "",
      phoneNumber: "",
      address: "",
    },
  });
  return (
    <div className="flex justify-center items-center heightcalc">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-[300px]"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="firstName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="lastName" {...field} />
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
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="repassword" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ul className="list-disc ml-8 text-xs text-muted-foreground">
            <li>Том үсэг орсон байх </li>
            <li>Жижиг үсэг орсон байх </li>
            <li>Тоо орсон байх</li>
            <li>Тэмдэгт орсон байх</li>
          </ul>
          <Button variant={"myBtn"} type="submit">
            Үүсгэх
          </Button>
          <Link
            href="/Login"
            className={` bg-white flex justify-center text-black  border border-blue-700 rounded-2xl bg-primary w-full py-2 px-4`}
          >
            Нэвтрэх
          </Link>
        </form>
      </Form>
    </div>
  );
};

{
  /* <div className="flex justify-center items-center w-full heightcalc">
      <div className="w-[334px] ">
        <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Input placeholder="Овог" name="lastName" onChange={handleLogForm} />
          <Input placeholder="Нэр" name="firstName" onChange={handleLogForm} />
          <Input
            type="email"
            placeholder="Имейл хаяг"
            name="email"
            onChange={handleLogForm}
          />
          <Input
            placeholder="Нууц үг"
            name="password"
            onChange={handleLogForm}
          />
          <Input
            placeholder="Нууц үг давтах"
            name="repassword"
            onChange={handleLogForm}
          />
          <ul className="list-disc">
            <li>Том үсэг орсон байх </li>
            <li>Жижиг үсэг орсон байх </li>
            <li>Тоо орсон байх</li>
            <li>Тэмдэгт орсон байх</li>
          </ul>
          <Button variant={"myBtn"} className="w-full" onClick={handleLogUp}>
            Үүсгэх
          </Button>
        </div>

        <Link
          href="/Login"
          className={` bg-white flex justify-center text-black  border border-blue-700 rounded-2xl bg-primary w-full py-2 px-4`}
        >
          Нэвтрэх
        </Link>
      </div>
    </div> */
}
