import { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { IPack } from "@/utils/interface";
import { ProfileContext } from "@/context/profile-context";
import axios from "axios";
import { apiURL } from "@/utils/apiHome";
import { Button } from "@/components/ui/button";
import { PriceWithDiscount } from "../productCard";
import { Trash2 } from "lucide-react";

export const PackCart = ({ _id, quantity, product_id, size }: IPack) => {
  const { setRefresh } = useContext(ProfileContext);
  const [count, setCount] = useState<number>(quantity);
  const [sizeUpdate, setSizeUpdate] = useState<string>(size);

  const updateCartProduct = async (
    cart_id: string,
    count: number,
    sizeUpdate: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${apiURL}update/cart/product`,
        {
          sizeUpdate,
          cart_id,
          count,
        },
        {
          headers: {
            Authorization: `Bearer, ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setRefresh((prevRefresh) => !prevRefresh);
      }
    } catch (error) {
      setRefresh((prevRefresh) => !prevRefresh);
      console.error(error);
    }
  };
  const deleteCartProduct = async (cart_id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${apiURL}delete/cart/product/${cart_id}`,
        {
          headers: {
            Authorization: `Bearer, ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setRefresh((prevRefresh) => !prevRefresh);
        const { message } = res.data;

        toast.success(message);
      }
    } catch (error) {
      setRefresh((prevRefresh) => !prevRefresh);
      console.error(error);
    }
  };
  const handleSub = () => {
    if (count === 1) {
      return;
    }
    setCount((prevCount) => {
      const newCount = prevCount > 1 ? prevCount - 1 : 1;
      updateCartProduct(_id, newCount, sizeUpdate);
      return newCount;
    });
  };
  const handleAdd = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      updateCartProduct(_id, newCount, sizeUpdate);
      return newCount;
    });
  };
  const handleSelectChange = (value: string) => {
    setSizeUpdate(value);
    updateCartProduct(_id, count, value);
  };
  const handleDelete = (id: string) => {
    deleteCartProduct(id);
  };
  useEffect(() => {
    setCount(quantity);
  }, [quantity]);
  return (
    <div className="w-[574px] bg-white rounded-2xl border-slate-200 border p-4 flex items-center gap-6 relative">
      <img
        src={product_id.images[0]}
        alt="img"
        className="w-[100px] h-[100px] rounded-2xl"
      />
      <div className="">
        <h1 className="font-normal text-base mb-2">{product_id.name}</h1>
        <div className="flex items-center gap-4 ">
          <Select onValueChange={handleSelectChange} value={size}>
            <SelectTrigger className="w-16">
              <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {["S", "M", "L", "XL", "XXL"].map((sizeOption, idx) => (
                  <SelectItem
                    value={sizeOption}
                    key={idx}
                    disabled={sizeOption === size}
                  >
                    {sizeOption}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="">
            <Button
              className="rounded-full bg-transparent border border-black text-black dark:text-white dark:border-white w-8 h-8"
              onClick={handleSub}
            >
              -
            </Button>
            <label className="4xl mx-4">{count}</label>
            <Button
              className="rounded-full bg-transparent border border-black text-black dark:text-white dark:border-white w-8 h-8"
              onClick={handleAdd}
            >
              +
            </Button>
          </div>
        </div>
        <PriceWithDiscount
          price={product_id.price}
          discount={product_id.discount}
        />

        <button
          className="absolute top-4 right-4"
          onClick={() => handleDelete(_id)}
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
};
