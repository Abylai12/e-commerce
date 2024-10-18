import { ProfileContext } from "@/context/profile-context";
import React, { useContext } from "react";

import { formattedPrice } from "@/lib/utils";
import { Button } from "../../ui/button";
import { PackCart } from "./packCard";

const PackPageCart = () => {
  const { packList, totalNumber } = useContext(ProfileContext);
  return (
    <div>
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
  );
};

export default PackPageCart;
