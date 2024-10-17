"use client";

import PackPageCart from "@/components/cards/PackCards/packCart";

const CartPage = () => {
  return (
    <div className="bg-slate-200 flex items-center flex-col ">
      <div className="mb-10">
        <div className="flex justify-center gap-20 my-[50px]">
          <div className="w-8 h-8 text-white rounded-full border bg-blue-700 flex items-center justify-center">
            1
          </div>
          <div className="w-8 h-8 text-black rounded-full border bg-white flex items-center justify-center">
            2
          </div>
          <div className="w-8 h-8 text-black rounded-full border bg-white flex items-center justify-center">
            3
          </div>
        </div>
        <PackPageCart />
      </div>
    </div>
  );
};

export default CartPage;
