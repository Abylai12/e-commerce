"use client";

import React, { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false); // For tracking request status
  const router = useRouter();

  const logUpUser = async (zodValue: IUser) => {
    setIsLoading(true); // Start loading state
    try {
      const { firstName, lastName, repassword, email, password } = zodValue;

      if (password !== repassword) {
        toast.error("Нууц үг хоорондоо нийцэхгүй байна");
        setIsLoading(false); // Stop loading
        return;
      }

      const newForm = { email, password, firstName, lastName };
      const res = await axios.post(`${apiURL}auth/logup`, newForm);

      if (res.status === 200) {
        toast.success("Хэрэглэгч амжилттай бүртгэгдлээ");
        router.push("/Login");
      } else {
        toast.error("Бүртгэлтэй хэрэглэгч байна!");
      }
    } catch (error: any) {
      console.log("error", error);
      toast.warning("Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading when the request is done
    }
  };

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
                  <Input placeholder="First Name" {...field} />
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
                  <Input placeholder="Last Name" {...field} />
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
                  <Input placeholder="Email" {...field} />
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
                  <Input placeholder="Password" {...field} type="password" />
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
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Phone and address fields (Optional or to be added later) */}
          <Button
            variant={"myBtn"}
            type="submit"
            disabled={isLoading} // Disable the button while loading
            className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isLoading ? "Бүртгэж байна..." : "Үүсгэх"}
          </Button>
          <Link
            href="/Login"
            className="bg-white flex justify-center text-black border border-blue-700 rounded-2xl bg-primary w-full py-2 px-4"
          >
            Нэвтрэх
          </Link>
        </form>
      </Form>
    </div>
  );
};
