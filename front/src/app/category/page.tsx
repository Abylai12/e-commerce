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
        category,
        size,
      });
      if (res.status === 200) {
        const { products, lastProduct } = res.data;
        setProducts(products);
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, [search, size, category]);
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="py-16 px-[200px] flex">
      <div className="">
        <label className="font-bold text-base">Ангилал</label>
        <RadioGroup
          defaultValue=""
          onValueChange={(value) => setCategory(value)}
        >
          <div className="flex items-center gap-4 w-[180px] mt-4">
            <RadioGroupItem value="" />
            <Label htmlFor="r1" className="">
              All
            </Label>
          </div>
          {catList?.map((data, idx) => (
            <div className="flex items-center gap-4 w-[180px] mt-4" key={idx}>
              <RadioGroupItem value={data._id} />
              <Label htmlFor="r1" className="">
                {data.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="mt-6">
          <label className="font-bold text-base">Хэмжээ</label>
        </div>
        <RadioGroup onValueChange={(value) => setSize(value)}>
          <div className="flex items-center gap-4 w-[180px] mt-4">
            <RadioGroupItem value="" />
            <Label htmlFor="r1" className="">
              All
            </Label>
          </div>
          {["S", "M", "L", "XL", "XXL"].map((sizeOption, idx) => (
            <div className="flex items-center gap-4 mt-4" key={idx}>
              <RadioGroupItem value={sizeOption} />
              <Label htmlFor={`size-${idx}`}>{sizeOption}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="grid grid-cols-3 gap-4 ml-10">
        {products?.map(
          ({ category, _id, discount, name, price, images }, idx) => (
            <div key={idx}>
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

// const res = await fetch(`${apiURL}/get/product`, {
//   cache: "no-store",
// });

// if (!res.ok) {
//   throw new Error("Failed to fetch products");
// }

// const { products } = await res.json();
