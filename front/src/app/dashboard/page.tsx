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
        console.log("object", products);
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
      {last?.map((product: Product, idx: number) => (
        <FeaturedProductCard
          _id={product._id}
          key={idx}
          name={product.name}
          discount={product.discount}
          price={product.price}
          images={
            product.images && product.images.length > 0 ? product.images[0] : ""
          }
        />
      ))}

      <div className="grid grid-cols-4  grid-rows- gap-4 px-[200px] py-5">
        {products?.map((product: Product, idx: number) => (
          <div
            key={idx}
            className={idx === 6 || idx === 7 ? "col-span-2 row-span-2" : ""}
          >
            <ProductCard
              _id={product._id}
              discount={product.discount}
              name={product.name}
              price={product.price}
              images={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : ""
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
