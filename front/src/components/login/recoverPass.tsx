"use client";

import React, { useContext, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/utils/validationSchema";
import { form } from "@/utils/validationSchema";
import { ProfileContext } from "@/context/profile-context";
import { useSearchParams } from "next/navigation";

// type LogInProps = {
//   handleLogForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleClick: () => void;
// };
const RecoverPass = () => {
  const { verifyUserPassword } = useContext(ProfileContext);
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("resetToken");
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    verifyUserPassword(resetToken, values);
    console.log(values);
  };
  return (
    <div className="flex justify-center items-center w-full heightcalc">
      <div className="w-[334px] ">
        <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="password" {...field} />
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
                        placeholder="repassword"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ul className="list-disc">
                <li>Том үсэг орсон байх </li>
                <li>Жижиг үсэг орсон байх </li>
                <li>Тоо орсон байх</li>
                <li>Тэмдэгт орсон байх</li>
              </ul>
              <Button variant={"myBtn"} className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RecoverPass;
