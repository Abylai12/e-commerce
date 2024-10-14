"use client";

import {
  PriceWithDiscount,
  SaveListCart,
} from "@/components/cards/productCard";
import { ProfileContext } from "@/context/profile-context";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const SaveList = () => {
  const { list, setList, user } = useContext(ProfileContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/404");
    } else {
      router.push("/save");
    }
  }, [user]);

  return (
    <div className="bg-gray-200 flex gap-5 flex-col items-center py-[56px] justify-center">
      <h1 className="font-bold text-xl">Хадгалсан бараа ({list?.length})</h1>

      {list?.map(({ product_id }, idx) => (
        <SaveListCart
          _id={product_id._id}
          images={product_id.images}
          price={product_id.price}
          discount={product_id.discount}
          name={product_id.name}
          key={idx}
        />
      ))}
    </div>
  );
};

export default SaveList;

// const getSaveProducts = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!list) {
//       return;
//     }
//     const arr = list.map((item) => item.product_id);
//     const res = await axios.post(
//       `${apiURL}get/save/products`,
//       { arr },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (res.status === 202) {
//       return toast.warning("хадгалсан бараа байна");
//     }
//     if (res.status === 200) {
//       const { products } = res.data;
//       setSaveProducts(products);
//       console.log("productsSave", products);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
