"use client";

import Header from "@/components/header/header";
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
  return <div className=""></div>;
}
