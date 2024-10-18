import React, { useContext } from "react";
import { PriceWithDiscount } from "../../productCard";
import { ProfileContext } from "@/context/profile-context";
import { formattedPrice } from "@/lib/utils";

const VerifyPackCard = () => {
  const { packList, totalNumber } = useContext(ProfileContext);
  return (
    <div className="bg-white rounded-2xl">
      <h1>Сагс ({packList?.length})</h1>
      <div className=" flex flex-col gap-4 w-[333px]  p-4">
        {packList?.map(({ quantity, product_id, size }, idx) => (
          <div className="flex gap-3" key={idx}>
            <img
              src={product_id.images[0]}
              alt="img"
              className="w-[100px] h-[100px] rounded-2xl"
            />
            <div className="">
              <h1 className="font-normal text-base mb-2">{product_id.name}</h1>
              <div className="flex gap-2">
                <p className="font-bold">сонголт: {size}</p>
                <p className="font-bold"> тоо:{quantity}</p>
              </div>
              <PriceWithDiscount
                price={product_id.price}
                discount={product_id.discount}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between p-4">
        <p>Нийт төлөх дүн:</p>
        <p className="font-bold">{formattedPrice(totalNumber ?? 0)}</p>
      </div>
    </div>
  );
};

export default VerifyPackCard;
