"use client";
import { ProductCard } from "@/components/cards/productCard";
import { ProfileContext } from "@/context/profile-context";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { apiURL } from "@/utils/apiHome";
import { Product } from "@/utils/interface";
import axios from "axios";

import React, { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const { search } = useContext(ProfileContext);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [catList, setCatList] = useState<Product[] | null>(null);
  const getAllProducts = async () => {
    try {
      const res = await axios.post(`${apiURL}/get/products/search`, {
        name: search,
      });
      if (res.status === 200) {
        const { products, lastProduct } = res.data;
        setProducts(products);
        console.log("object", products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${apiURL}/category`);
      if (res.status === 200) {
        const { categories } = res.data;
        setCatList(categories);
        console.log("object", categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, [search]);
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="py-16 px-[200px] flex">
      <div className="">
        <label className="font-bold text-base">Ангилал</label>
        <RadioGroup
          defaultValue=""
          onChange={(e) => setCategory(e.target.value)}
        >
          {catList?.map((data, idx) => (
            <div className="flex items-center gap-4 w-[180px] mt-6" key={idx}>
              <RadioGroupItem value={data._id} id="r1" />
              <Label htmlFor="r1" className="">
                {data.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <label className="font-bold text-base">Хэмжээ</label>
        <RadioGroup onChange={(e) => setSize(e.target.value)}>
          {["S", "M", "L", "XL", "XXL"].map((sizeOption, idx) => (
            <div className="flex items-center gap-4 mt-6" key={idx}>
              <RadioGroupItem value={sizeOption} />
              <Label htmlFor={`size-${idx}`}>{sizeOption}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="grid grid-cols-3 gap-4 ml-10">
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

// const res = await fetch(`${apiURL}/get/product`, {
//   cache: "no-store",
// });

// if (!res.ok) {
//   throw new Error("Failed to fetch products");
// }

// const { products } = await res.json();
