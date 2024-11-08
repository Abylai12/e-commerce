import { ProfileContext } from "@/context/profile-context";
import { formattedPrice } from "@/lib/utils";
import { apiURL } from "@/utils/apiHome";
import { Product, SaveProduct } from "@/utils/interface";
import axios from "axios";
import { Heart, Trash2 } from "lucide-react";

import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import Image from "next/image";

const getDiscountedPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export const ProductCard = ({
  name,
  price,
  images,
  discount,
  _id,
  category,
}: Product) => {
  const { setProductId, setRefresh } = useContext(ProfileContext);
  const createSaveProduct = async (product_id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${apiURL}save/product`,
        { product_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Бараа амжилттай хадгалагдлаа");
        setProductId(product_id);
        setRefresh((prev) => !prev);
      }
      if (res.status === 201) {
        toast.success("Хадгалсан бараа байна");
      }
    } catch (error) {
      toast.error("Нэвтэрнэ үү");
      console.error(error);
    }
  };
  const handleSave = (id: string) => {
    createSaveProduct(id);
  };
  return (
    <div>
      <div className={`relative`}>
        <Link href={"/detail/" + _id + "?cat_id=" + category}>
          <Image
            src={images[0]}
            alt="image1"
            className="rounded-lg h-full w-full"
          />
          <div className="mt-2">
            <h3 className="font-light">{name}</h3>
            <PriceWithDiscount price={price} discount={discount} />
          </div>
        </Link>
        <button onClick={() => handleSave(_id)}>
          <Heart
            size={22}
            strokeWidth={1}
            className="absolute top-4 right-4 hover:fill-inherit"
          />
        </button>
      </div>
    </div>
  );
};

export const FeaturedProductCard = ({
  name,
  price,
  images,
  discount,
  _id,
  category,
}: Product) => {
  return (
    <div className="relative">
      <Link href={"/detail/" + _id + "?" + category}>
        <div className="col-span-2 row-span-10 mb-14">
          <div className="relative  ">
            <Image
              src={images[0]}
              alt="image1"
              className="rounded-lg -z-10 object-cover w-full h-[450px] "
            />

            <div className="mt-2 absolute bottom-4 left-8">
              <h3 className="font-light">{name}</h3>
              <PriceWithDiscount price={price} discount={discount} />
            </div>
          </div>
        </div>
      </Link>
      <button>
        <Heart
          size={22}
          strokeWidth={1}
          className="absolute  top-4 right-4 hover:fill-inherit mb-4"
        />
      </button>
    </div>
  );
};

export const PriceWithDiscount = ({
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

export const SaveListCart = ({
  _id,
  name,
  price,
  images,
  discount,
}: SaveProduct) => {
  const { setRefresh } = useContext(ProfileContext);
  const deleteSaveProduct = async (product_id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${apiURL}save/product/delete`,
        { product_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Бараа амжилттай устгахдлаа");
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      toast.error("Нэвтэрнэ үү");
      console.error(error);
    }
  };
  const handleClick = (id: string) => {
    deleteSaveProduct(id);
  };
  return (
    <div className="w-[622px] h-[132px] bg-white rounded-2xl p-4 flex items-center gap-6 relative">
      <Image
        src={images[0]}
        alt="img"
        className="w-[100px] h-[100px] rounded-2xl"
      />
      <div className="">
        <h1 className="font-normal text-base mb-2">{name}</h1>
        <PriceWithDiscount price={price} discount={discount} />
        <Button className="mt-2 bg-[#2563EB] rounded-3xl">Сагслах</Button>
        <div className="absolute top-4 right-4 fill-inherit">
          <Heart size={22} strokeWidth={1} className="fill-inherit mb-4" />
          <button onClick={() => handleClick(_id)}>
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
};
