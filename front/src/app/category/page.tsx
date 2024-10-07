// "use client";
import { ProductCard } from "@/components/cards/productCard";

import { apiURL } from "@/utils/apiHome";
import { Product } from "@/utils/interface";

import React from "react";

const Dashboard = async () => {
  const res = await fetch(`${apiURL}/get/product`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const { products } = await res.json();

  return (
    <div className="mb-8">
      <div className="grid grid-cols-3 gap-4 px-[200px] py-5">
        {products?.map((product: Product, idx: number) => (
          <div key={idx}>
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
