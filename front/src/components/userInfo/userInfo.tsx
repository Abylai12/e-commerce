"use client";

import React, { useState } from "react";
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
import { formSchema } from "@/utils/validationSchema";
import { form } from "@/utils/validationSchema";

const UserInfo = () => {
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("userInfo", values);
  };
  return (
    <div className="w-[620px] h-[509px]">
      <h1 className="font-bold text-xl text-foreground">Хэрэглэгчийн хэсэг</h1>
      <div className="border-t border-gray-700 mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-[300px]"
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

export default UserInfo;

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
