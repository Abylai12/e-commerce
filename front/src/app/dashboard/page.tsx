"use client";
import { ProductCard } from "@/components/cards/productCard";
import { ProfileContext } from "@/context/profile-context";
import { apiURL } from "@/utils/apiHome";
import { Product } from "@/utils/interface";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  // const [user, setUser] = useState<ILoggedUser | null>(null);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${apiURL}/get/product`);
      if (res.status === 200) {
        const { products } = res.data;
        setProducts(products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [products]);
  return (
    <div className="text-4xl font-bold">
      <div>
        <img src="" alt="img" className="w-full" />
      </div>
      <div className="grid grid-cols-4">
        {products?.map((product, idx) => (
          <ProductCard
            key={idx}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
