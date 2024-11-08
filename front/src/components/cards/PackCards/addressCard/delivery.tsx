"use client";

import React, { useContext, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
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
import { deliveryUserSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileContext } from "@/context/profile-context";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader/loader";
interface CardProps {
  onSubmit: (values: z.infer<typeof deliveryUserSchema>) => void;
  handleBack: () => void;
}

const DeliveryCard = ({ onSubmit, handleBack }: CardProps) => {
  const { user } = useContext(ProfileContext);
  const form = useForm<z.infer<typeof deliveryUserSchema>>({
    resolver: zodResolver(deliveryUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      additionalInfo: "",
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber ?? "",
        address: user.address ?? "",
      });
    }
  }, [user, form]);

  return (
    <div>
      <div className="w-[680px] bg-white p-5 rounded-2xl">
        <h1 className="font-bold text-xl text-foreground">
          Хэрэглэгчийн хэсэг
        </h1>
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
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Нэмэлт Мэдээлэл</FormLabel>
                        <FormControl>
                          <Textarea placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <label>
                    Хүргэлттэй холбоотой нэмэлт мэдээлэл үлдээгээрэй
                  </label>

                  <div className="flex justify-between">
                    <Button variant={"myBtn"} onClick={handleBack}>
                      Буцах
                    </Button>
                    <Button variant={"myBtn"} type="submit">
                      Төлбөр төлөх
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
    </div>
  );
};

export default DeliveryCard;
