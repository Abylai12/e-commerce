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
import axios from "axios";
import { apiURL } from "@/utils/apiHome";
import { ISaveProduct } from "../detail/detailCart";

// type ListSave = {
//   product_id: string;
//   _id: string;
// };
const Header = () => {
  const {
    user,
    setSearch,
    productId,
    saveList,
    setSaveList,
    setPackList,
    packList,
    setRefresh,
    setTotalNumber,
    refresh,
    localProducts,
  } = useContext(ProfileContext);
  const router = useRouter();

  const getSaveList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const res = await axios.get(`${apiURL}save/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const { products } = res.data;
        setSaveList(products);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getPackList = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const res = await axios.get(`${apiURL}pack/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const { products, totalAmount } = res.data;
        setTotalNumber(totalAmount);
        setPackList(products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSaveList();
    getPackList();
  }, [refresh]);

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
          className="bg-primary text-white"
          placeholder="Бүтээгдэхүүн хайх"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-6">
        <Link href={user ? "/save" : "/"}>
          <div className="relative">
            <Heart className="text-white" />
            {!user ? (
              <div></div>
            ) : (
              <div className="absolute -top-1/4 -right-1/4 bg-blue-400 rounded-full text-[10px] w-4 h-4 flex items-center justify-center text-white">
                {saveList?.length}
              </div>
            )}
          </div>
        </Link>
        <Link href={user ? "/cart" : "/"}>
          <div className="relative">
            <ShoppingCart className="text-white" />
            {!user ? (
              <div
                className={`absolute -top-1/4 -right-1/4 ${
                  localProducts?.length ? "bg-blue-400" : ""
                } rounded-full text-[10px] w-4 h-4 flex items-center justify-center text-white`}
              >
                {localProducts?.length}
              </div>
            ) : (
              <div className="absolute -top-1/4 -right-1/4 bg-blue-400 rounded-full text-[10px] w-4 h-4 flex items-center justify-center text-white">
                {packList?.length}
              </div>
            )}
          </div>
        </Link>

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
