"use client";

import React, { useEffect, useState } from "react";

import { Search } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { UserPen } from "lucide-react";

const Header = () => {
  const [token, setToken] = useState<boolean>(true);
  // const token = localStorage.getItem("token");
  // console.log("token", token);
  const router = useRouter();
  // useEffect(() => {}, []);
  return (
    <section className="flex bg-black px-6 py-4 justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img src="./Vector.svg" alt="img" />
          <span className="text-white text-sm">ECOMMERCE</span>
        </div>
        <span className="text-white">Ангилал</span>
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

        {!token ? (
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
          <button>
            <UserPen className="text-white" />
          </button>
        )}
      </div>
    </section>
  );
};

export default Header;
