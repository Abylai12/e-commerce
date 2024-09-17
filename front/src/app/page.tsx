"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-context-menu";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState<number>(5);
  const minus = () => {
    setCount(count - 1);
  };
  const plus = () => {
    setCount(count + 1);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
      <h1>Welcome</h1>
      <div className="flex">
        <Button onClick={minus}>-</Button>
        <Label>{count}</Label>
        <Button onClick={plus}>+</Button>
      </div>
    </div>
  );
}
