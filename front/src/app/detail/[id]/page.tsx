"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "@/utils/apiHome";
import { useParams } from "next/navigation";
import { IProduct, Product } from "@/utils/interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceWithDiscount, ProductCard } from "@/components/cards/productCard";
import DetailCart from "@/components/detail/detailCart";
import { Rating } from "@smastrom/react-rating";
import { RateComment } from "@/components/detail/rating";

const ProductDetailPage = () => {
  const params = useParams();
  const [detail, setDetail] = useState<IProduct[] | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  const getProductDetail = async () => {
    try {
      const res = await axios.get(`${apiURL}/get/product/detail/${params.id}`);
      if (res.status === 200) {
        const { productDetail, products } = res.data;
        setDetail(productDetail);
        setProducts(products);

        console.log("detail", productDetail);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <div>
      <div className="w-1/2 m-auto">
        <div className="flex pt-[52px] pb-20 gap-5">
          {detail?.map(
            ({ images, isNew, price, discount, description, name }, idx) => (
              <DetailCart
                key={idx}
                images={images}
                isNew={isNew}
                price={price}
                discount={discount}
                description={description}
                name={name}
              />
            )
          )}
        </div>
  
      </div>
      <h1
        className="px-[200px] font-bold text-3xl
      "
      >
        Холбоотой бараа
      </h1>
      <div className="grid grid-cols-4 px-[200px] gap-4 py-5">
        {products?.map((product: Product, idx: number) => (
          <ProductCard
            key={idx}
            category={product.category}
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
        ))}
      </div>
    </div>
  );
};
export default ProductDetailPage;
