import React from "react";
import {
  Phone,
  Mail,
  Copyright,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";

import { Twitter } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <section className="bg-black py-12 px-[200px]">
      <div className="flex justify-between items-center">
        <Image src="./Vector.svg" alt="img" />
        <div className="flex gap-10">
          <div className="text-white flex items-center gap-5">
            <div className="w-12 h-12 border border-slate-500  rounded-full flex items-center justify-center">
              <Phone className="" />
            </div>
            <p> (976) 7007-1234</p>
          </div>
          <div className="text-white flex items-center gap-5">
            <div className="w-12 h-12 rounded-full border border-slate-500 flex items-center justify-center">
              <Mail />
            </div>
            <p>contact@ecommerce.mn</p>
          </div>
        </div>
      </div>
      <div className="border-b border-slate-500 my-11"></div>
      <div className="text-white flex justify-between">
        <div className="flex gap-2">
          <Copyright />
          <p>2024 Ecommerce MN</p>
        </div>
        <div className="flex gap-7">
          <Facebook />
          <Instagram />
          <Twitter />
          <Linkedin />
        </div>
      </div>
    </section>
  );
};

export default Footer;
