"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "@/utils/apiHome";
import { useParams } from "next/navigation";
import DetailCart from "@/components/detail/detailCart";
import { IProduct } from "@/utils/interface";

const ProductDetailPage = () => {
  const params = useParams();
  const [detail, setDetail] = useState<IProduct | null>(null);

  const getProductDetail = async () => {
    try {
      const res = await axios.get(`${apiURL}/get/product/detail/${params.id}`);
      if (res.status === 200) {
        const { productDetail, products } = res.data;
        setDetail(productDetail);
        console.log("detail", typeof productDetail);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("img");
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <div className="w-1/2 m-auto">
      <div className="flex">
        <div>
          <img
            src={
              detail?.images && detail.images.length > 0 ? detail.images[0] : ""
            }
            alt=""
          />
        </div>
        <DetailCart description={detail?.description} name={detail?.name} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
