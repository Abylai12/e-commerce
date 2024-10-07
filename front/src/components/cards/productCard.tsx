import { formattedPrice } from "@/lib/utils";
import { Product } from "@/utils/interface";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getDiscountedPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export const ProductCard = ({
  name,
  price,
  images,
  discount,
  _id,
}: Product) => {
  return (
    <Link href={"/detail/" + _id}>
      <div className={`relative`}>
        <img src={images} alt="image1" className="rounded-lg h-full w-full" />
        <Heart size={22} strokeWidth={1} className="absolute top-4 right-4" />
        <div className="mt-2">
          <h3 className="font-light">{name}</h3>
          <PriceWithDiscount price={price} discount={discount} />
        </div>
      </div>
    </Link>
  );
};

export const FeaturedProductCard = ({
  name,
  price,
  images,
  discount,
  _id,
}: Product) => {
  return (
    <Link href={"/detail/" + _id}>
      <div className="relative col-span-2 row-span-10 mb-14">
        <div className="relative  ">
          <img
            src={images}
            alt="image1"
            className="rounded-lg -z-10 object-cover w-full h-[450px] "
          />
          <Heart size={22} strokeWidth={1} className="absolute top-4 right-4" />
          <div className="mt-2 absolute bottom-4 left-8">
            <h3 className="font-light">{name}</h3>
            <PriceWithDiscount price={price} discount={discount} />
          </div>
        </div>
      </div>
    </Link>
  );
};

const PriceWithDiscount = ({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) => {
  const discountedPrice = getDiscountedPrice(price, discount);
  return (
    <div className="flex items-center gap-4 mt-1">
      <p className="font-bold">
        {formattedPrice(discount > 0 ? discountedPrice : price)}₮
      </p>
      {discount > 0 && (
        <>
          <span className="text-muted-foreground text-xs line-through">
            {`${formattedPrice(price)}₮`}
          </span>
          <span className="font-bold text-destructive">{discount}%</span>
        </>
      )}
    </div>
  );
};
