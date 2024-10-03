"use client";

import React, { useContext, useEffect, useState } from "react";

import { Search } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ProfileContext } from "@/context/profile-context";
import { DropdownMenuDemo } from "./dropdown";
import Link from "next/link";

const Header = () => {
  const { user } = useContext(ProfileContext);
  const router = useRouter();

  return (
    <section className="flex bg-black px-6 py-4 justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img src="./Vector.svg" alt="img" />
          <Link href="/dashboard" className="text-white text-sm">
            ECOMMERCE
          </Link>
        </div>
        <Link href="/category" className="text-white">
          Ангилал
        </Link>
      </div>
      <div className="py-2 px-4 rounded-[20px] bg-primary flex items-center gap-2">
        <Search className="text-white text-2xl" />
        <input
          type="text"
          className="bg-primary"
          placeholder="Бүтээгдэхүүн хайх"
        />
      </div>
      <div className="flex items-center gap-6">
        <Heart className="text-white" />
        <ShoppingCart className="text-white" />

        {!user ? (
          <div>
            <Button
              variant={"outline"}
              className="mr-2"
              onClick={() => router.push("/Logup")}
            >
              бүртгүүлэх
            </Button>
            <Button variant={"myBtn"} onClick={() => router.push("/Login")}>
              Нэвтрэх
            </Button>
          </div>
        ) : (
          <DropdownMenuDemo imgURl={user.profile_img} />
        )}
      </div>
    </section>
  );
};

export default Header;
