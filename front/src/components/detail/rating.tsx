"use client";

import { ProfileContext } from "@/context/profile-context";
import { apiURL } from "@/utils/apiHome";
import { Rating } from "@smastrom/react-rating";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { number } from "zod";

export const RateComment = ({ isOpen }: { isOpen: boolean }) => {
  const { user } = useContext(ProfileContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState<string | null>(null);
  const product_id = useParams();

  const postComment = async () => {
    if (!comment) {
      return toast.warning("comment bichenee uu");
    }
    const commentForm = {
      userName: user?.firstName,
      description: comment,
      rating: rating,
    };
    try {
      const res = await axios.post(
        `${apiURL}user/comment`,
        commentForm,
        product_id
      );
      if (res.status === 200) {
        toast.success("amjillttai ilgeelee");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={isOpen ? "hidden" : ""}>
      <div className="border-b-2 border-dashed px-4 py-3 font-mono text-sm flex flex-col mb-2">
        <h5>Saraa</h5>
        <p className="text-xs text-gray-400">
          Ваав материал ёстой гоё байна 😍
        </p>
      </div>
      <div className="bg-slate-100 border rounded-xl h-56 p-4 flex flex-col justify-between">
        <h4 className="text-sm font-medium">Одоор үнэлэх:</h4>
        <Rating
          className="w-6 h-6"
          style={{ maxWidth: 120, padding: 0 }}
          value={rating}
          onChange={setRating}
          isRequired
        />
        <div className="flex flex-col gap-2 ">
          <p className="text-sm font-medium">Сэтгэгдэл үлдээх:</p>
          <textarea
            placeholder="Энд бичнэ үү"
            name="description"
            className="h-16 w-full border rounded-[9px] p-2 text-xs"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="w-24 h-7 border rounded-full bg-blue-700 text-white text-sm">
          Үнэлэх
        </button>
      </div>
    </div>
  );
};
