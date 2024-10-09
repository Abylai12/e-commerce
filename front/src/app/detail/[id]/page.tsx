"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "@/utils/apiHome";
import { useParams } from "next/navigation";
import { IProduct } from "@/utils/interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceWithDiscount } from "@/components/cards/productCard";

const ProductDetailPage = () => {
  const params = useParams();
  const [detail, setDetail] = useState<IProduct[] | null>(null);
  const [count, setCount] = useState<number>(0);
  const handleSub = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  const getProductDetail = async () => {
    try {
      const res = await axios.get(`${apiURL}/get/product/detail/${params.id}`);
      if (res.status === 200) {
        const { productDetail, products } = res.data;
        setDetail(productDetail);
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
    <div className="w-1/2 m-auto">
      <div className="flex pt-[52px] pb-20 gap-5">
        <section>
          <div className="flex flex-row-reverse gap-5">
            <div>
              <img
                src={""}
                alt="img"
                className="w-[422px] h-[521px] rounded-2xl "
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              {detail?.map(({images}) => (
                <>
                  <img
                    src={
                      !data
                        ? data.
                        : "https://images.unsplash.com/photo-1719937206255-cc337bccfc7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                    }
                    alt=""
                    className="w-[67px] h-[67px] rounded-sm"
                    key={idx}
                  />
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-end ">
            <Badge className="bg-transparent text-black border border-blue-700 w-16 text-xs text-center font-semibold">
              {detail?.isNew ? "Шинэ" : "Хуучин"}
            </Badge>
            <h2 className="font-bold text-2xl">{detail?.name}</h2>
            <p>{detail?.description}</p>
            <div className="flex flex-col gap-2 my-4">
              <p className="text-base underline">Хэмжээний загвар</p>
              <div className="flex gap-2">
                {["S", "M", "L", "XL", "XXL"].map((sizeOption, idx) => (
                  <Button
                    className="rounded-full bg-transparent border border-black text-black dark:text-white dark:border-white w-8 h-8"
                    key={idx}
                  >
                    {sizeOption}
                  </Button>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  className="rounded-full bg-transparent border border-black text-black dark:text-white dark:border-white w-8 h-8"
                  onClick={handleSub}
                >
                  -
                </Button>
                <label className="4xl mx-4">{count}</label>
                <Button
                  className="rounded-full bg-transparent border border-black text-black dark:text-white dark:border-white w-8 h-8"
                  onClick={() => setCount(count + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="mt-6 mb-14">
              <div className="flex gap-2 items-center mb-2">
                <PriceWithDiscount
                  price={detail?.price ?? 0}
                  discount={detail?.discount ?? 0}
                />
              </div>
              <Button className="bg-[#2563EB]">Сагсанд нэмэх</Button>
            </div>
            <div>
              <div className="mb-1">
                <span className="mr-2 text-sm">Үнэлгээ</span>
                <Button
                  className="text-sm text-[#2563EB] underline"
                  variant="ghost"
                >
                  бүгдийг харах
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#09090B]">4.6</span>
                <span className="text-sm">(24)</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
