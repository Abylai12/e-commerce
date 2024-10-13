"use client";

import {
  PriceWithDiscount,
  SaveListCart,
} from "@/components/cards/productCard";
import { Button } from "@/components/ui/button";
import { ProfileContext } from "@/context/profile-context";
import { apiURL } from "@/utils/apiHome";
import { SaveProduct } from "@/utils/interface";
import axios from "axios";
import { get } from "http";
import { Heart } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const SaveList = () => {
  const { list, setList } = useContext(ProfileContext);
  const [saveProducts, setSaveProducts] = useState<SaveProduct[] | null>(null);
  console.log("object", list);
  const getSaveProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!list) {
        return;
      }
      const arr = list.map((item) => item.product_id);
      const res = await axios.post(
        `${apiURL}get/save/products`,
        { arr },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 202) {
        return toast.warning("хадгалсан бараа байна");
      }
      if (res.status === 200) {
        const { products } = res.data;
        setSaveProducts(products);
        console.log("productsSave", products);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSaveProducts();
  }, [list?.length]);
  return (
    <div className="bg-gray-200 flex gap-5 flex-col items-center py-[56px] justify-center">
      <h1 className="font-bold text-xl">
        Хадгалсан бараа ({saveProducts?.length})
      </h1>

      {saveProducts?.map(({ name, price, discount, images, _id }, idx) => (
        <SaveListCart
          _id={_id}
          images={images}
          price={price}
          discount={discount}
          name={name}
          key={idx}
        />
      ))}
    </div>
  );
};

export default SaveList;
