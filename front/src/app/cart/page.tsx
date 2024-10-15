"use client";

import { PackCart } from "@/components/cards/productCard";
import { Button } from "@/components/ui/button";
import { ProfileContext } from "@/context/profile-context";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { formattedPrice } from "@/lib/utils";

const CartPage = () => {
  const { packList, setPackList, user, totalNumber } =
    useContext(ProfileContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/404");
    } else {
      router.push("/cart");
    }
  }, [user]);
  return (
    <div className="bg-slate-200 flex items-center flex-col ">
      <div className="mb-10">
        <div className="flex justify-center gap-20 my-[50px]">
          <div className="w-8 h-8 text-white rounded-full border bg-blue-700 flex items-center justify-center">
            1
          </div>
          <div className="w-8 h-8 text-black rounded-full border bg-white flex items-center justify-center">
            2
          </div>
          <div className="w-8 h-8 text-black rounded-full border bg-white flex items-center justify-center">
            3
          </div>
        </div>
        <div className=" p-8 w-[632px]  rounded-2xl bg-white">
          <h1>Сагс ({packList?.length})</h1>
          <div className="flex flex-col gap-4">
            {packList?.map(({ product_id, quantity, size, _id }, idx) => (
              <PackCart
                key={idx}
                product_id={product_id}
                quantity={quantity}
                size={size}
                _id={_id}
              />
            ))}
          </div>
          <div className="flex justify-between p-4">
            <p>Нийт төлөх дүн:</p>
            <p className="font-bold">{formattedPrice(totalNumber ?? 0)}</p>
          </div>
          <div className="flex justify-end">
            <Button className="mt-2 bg-[#2563EB] rounded-3xl">
              Худалдан авах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
