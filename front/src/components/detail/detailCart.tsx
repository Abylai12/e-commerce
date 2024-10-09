import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { IProduct } from "@/utils/interface";
import { PriceWithDiscount } from "../cards/productCard";

const DetailCart = ({ name, description, price, discount }: IProduct) => {
  return (
    <div className="flex flex-col gap-3 justify-end ">
      <Badge className="bg-transparent text-black border border-black w-16 text-xs text-center font-semibold"></Badge>
      <h2 className="font-bold text-2xl">{name}</h2>
      <p>{description}</p>
      <div className="flex flex-col gap-2 my-4">
        <p className="text-base underline">Хэмжээний загвар</p>
        <div className="flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((sizeOption, idx) => (
            <Button
              className="rounded-full bg-transparent border border-black text-black dark:text-white dark:border-white w-8 h-8"
              key={idx}
            >
              {sizeOption}
            </Button>
          ))}
        </div>
        <div className="mt-4">
          <Button className="rounded-full bg-transparent border border-black text-black dark:text-white dark:border-white w-8 h-8">
            -
          </Button>
          <label className="4xl mx-4">count</label>
          <Button className="rounded-full bg-transparent border border-black text-black dark:text-white dark:border-white w-8 h-8">
            +
          </Button>
        </div>
      </div>
      <div className="mt-6 mb-14">
        <div className="flex gap-2 items-center mb-2">
          <PriceWithDiscount price={price} discount={discount} />
        </div>
        <Button className="bg-[#2563EB]">Сагсанд нэмэх</Button>
      </div>
      <div>
        <div className="mb-1">
          <span className="mr-2 text-sm">Үнэлгээ</span>
          <Button className="text-sm text-[#2563EB] underline" variant="ghost">
            бүгдийг харах
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#09090B]">4.6</span>
          <span className="text-sm">(24)</span>
        </div>
      </div>
    </div>
  );
};

export default DetailCart;
