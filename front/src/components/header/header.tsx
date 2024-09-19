import React from "react";

import { Search } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <section className="flex bg-black px-6 py-4 justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img src="./Vector.svg" alt="img" />
          <span className="text-white text-sm">ECOMMERCE</span>
        </div>
        <span className="text-white">Ангилал</span>
      </div>
      <div className="py-2 px-4 rounded-[20px] bg-primary flex items-center gap-2">
        <Search className="text-white text-2xl" />
        <input
          type="text"
          className="bg-primary"
          placeholder="Бүтээгдэхүүн хайх"
        />
      </div>
      <div className="flex items-center gap-6">
        <Heart className="text-white" />
        <ShoppingCart className="text-white" />

        <div>
          <Button variant={"outline"}>бүртгүүлэх</Button>
          <Button variant={"myBtn"}>Нэвтрэх</Button>
        </div>
      </div>
    </section>
  );
};

export default Header;
