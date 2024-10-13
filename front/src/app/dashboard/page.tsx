"use client";

import {
  FeaturedProductCard,
  ProductCard,
} from "@/components/cards/productCard";
import { ProfileContext } from "@/context/profile-context";
import { apiURL } from "@/utils/apiHome";
import { Product } from "@/utils/interface";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const { search } = useContext(ProfileContext);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [last, setLast] = useState<Product[] | null>(null);

  const getAllProducts = async () => {
    try {
      const res = await axios.post(`${apiURL}/get/products/search`, {
        name: search,
      });
      if (res.status === 200) {
        const { products, lastProduct } = res.data;
        setProducts(products);
        setLast(lastProduct);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [search]);

  return (
    <div className="mb-8">
      {last?.map(({ category, _id, name, discount, price, images }, idx) => (
        <FeaturedProductCard
          category={category}
          _id={_id}
          key={idx}
          name={name}
          discount={discount}
          price={price}
          images={images}
        />
      ))}

      <div className="grid grid-cols-4  grid-rows- gap-4 px-[200px] py-5">
        {products?.map(
          ({ category, _id, discount, name, price, images }, idx) => (
            <div
              key={idx}
              className={idx === 6 || idx === 7 ? "col-span-2 row-span-2" : ""}
            >
              <ProductCard
                category={category}
                _id={_id}
                discount={discount}
                name={name}
                price={price}
                images={images}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
