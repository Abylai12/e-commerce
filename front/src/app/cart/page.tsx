import { PackCart } from "@/components/cards/productCard";
import { Button } from "@/components/ui/button";
import React from "react";

const CartPage = () => {
  return (
    <div>
      <div>
        <h1>Сагс (9)</h1>
        <div>
          <PackCart />
        </div>
        <div>
          <p>Нийт төлөх дүн</p>
          <p>total amount</p>
        </div>
        <Button className="mt-2 bg-[#2563EB] rounded-3xl">Худалдан авах</Button>
      </div>
    </div>
  );
};

export default CartPage;
