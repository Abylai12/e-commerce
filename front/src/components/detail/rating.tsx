"use client";

import { Rating } from "@smastrom/react-rating";

import React, { Dispatch, SetStateAction } from "react";

interface IComments {
  userName: string;
  description: string;
  rating: number;
}
export const RateComment = ({
  isOpen,
  comments,
  comment,
  rating,
  setRating,
  setComment,
  handleClick,
}: {
  isOpen: boolean;
  comments: IComments[] | null;
  comment: string | null;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  setComment: Dispatch<SetStateAction<string | null>>;
  handleClick: () => void;
}) => {
  return (
    <div className={isOpen ? "hidden" : ""}>
      <div className="border-b-2 border-dashed px-4 py-3 font-mono text-sm flex flex-col mb-2">
        {comments?.map(({ description, userName, rating }, idx) => (
          <div className="" key={idx}>
            <div className="flex items-center gap-2">
              <h5>{userName}</h5>
              <Rating
                className="w-6 h-6"
                style={{ maxWidth: 80, padding: 0 }}
                value={rating}
                isRequired
              />
            </div>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        ))}
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
            value={comment || ""}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          className="w-24 h-7 border rounded-full bg-blue-700 text-white text-sm"
          onClick={handleClick}
        >
          Үнэлэх
        </button>
      </div>
    </div>
  );
};
