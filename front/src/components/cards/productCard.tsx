import { Product } from "@/utils/interface";
import { Heart } from "lucide-react";
import Image from "next/image";

export const ProductCard = ({ name, price, image }: Product) => {
  return (
    <div className="relative w-[244px]">
      <Image
        src={image}
        alt="image1"
        width={244}
        height={331}
        className="rounded-lg"
      />
      <Heart size={22} strokeWidth={1} className="absolute top-4 right-4" />
      <div className="mt-2">
        <h3 className="font-light">{name}</h3>
        <p className="font-light"> {price}</p>
      </div>
    </div>
  );
};
