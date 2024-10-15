"use client";

import { PackCart } from "@/components/cards/productCard";
import { Button } from "@/components/ui/button";
import { ProfileContext } from "@/context/profile-context";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const CartPage = () => {
  const { packList, setPackList, user } = useContext(ProfileContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/404");
    } else {
      router.push("/cart");
    }
  }, [user]);
  return (
    <div>
      <div>
        <h1>Сагс (9)</h1>
        <div>
          {packList?.map(({ product_id, quantity, size, _id }, idx) => (
            <PackCart
              product_id={product_id}
              quantity={quantity}
              size={size}
              _id={_id}
            />
          ))}
        </div>
        <div>
          <p>Нийт төлөх дүн</p>
          <p>total amount</p>
        </div>
        <Button className="mt-2 bg-[#2563EB] rounded-3xl">Худалдан авах</Button>
      </div>
    </div>
  );
};

export default CartPage;
