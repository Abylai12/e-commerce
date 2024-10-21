"use client";

import AddressCard from "@/components/cards/PackCards/addressCard/addressCard";
import PackPageCart from "@/components/cards/PackCards/changePackCard";
import PayCard from "@/components/cards/payCards/paycard";
import { useState } from "react";

const CartPage = () => {
  const [state, setState] = useState<number>(1);
  return (
    <div className="bg-slate-200 flex items-center flex-col ">
      <div className="mb-10">
        <div className="flex justify-center gap-20 my-[50px]">
          <div
            className={`bg-blue-700 w-8 h-8 text-white rounded-full border  flex items-center justify-center`}
          >
            1
          </div>
          <div
            className={` ${
              state === 2 || state === 3 ? "bg-blue-700 text-white" : "bg-white"
            } w-8 h-8 text-black rounded-full border  flex items-center justify-center`}
          >
            2
          </div>
          <div
            className={` ${
              state === 3 ? "bg-blue-700 text-white" : "bg-white"
            } w-8 h-8 text-black rounded-full border flex items-center justify-center`}
          >
            3
          </div>
        </div>
        {state === 1 && <PackPageCart setState={setState} />}
        {state === 2 && <AddressCard setState={setState} />}
        {state === 3 && <PayCard setState={setState} />}
      </div>
    </div>
  );
};

export default CartPage;
