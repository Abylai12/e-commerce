// "use client";
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

const Dashboard = async () => {
  // const [products, setProducts] = useState<Product[] | null>(null);
  // const [product, setProduct] = useState<Product[] | null>(null);
  // const [user, setUser] = useState<ILoggedUser | null>(null);

  // const getAllProducts = async () => {
  //   try {
  //     const res = await axios.get(`${apiURL}/get/product`);
  //     if (res.status === 200) {
  //       const { products, product } = res.data;
  //       setProducts(products);
  //       setProduct(product);
  //       console.log("object", products);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getAllProducts();
  // }, []);
  const res = await fetch(`${apiURL}/get/product`, {
    cache: "no-store", // Ensure data is fresh every time
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const { products, product } = await res.json();

  return (
    <div className="mb-8">
      {product?.map((product: Product, idx: number) => (
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
