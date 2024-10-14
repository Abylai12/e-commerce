import React, { useContext, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { IProduct } from "@/utils/interface";
import { PriceWithDiscount } from "../cards/productCard";
import { Heart } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { RateComment } from "./rating";
import axios from "axios";
import { apiURL } from "@/utils/apiHome";
import { useParams } from "next/navigation";
import { ProfileContext } from "@/context/profile-context";
import { toast } from "react-toastify";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";

interface IComments {
  userName: string;
  description: string;
  rating: number;
}
type ratingData = {
  ratingAVG: number;
  length: number;
};

const DetailCart = ({
  _id,
  images,
  isNew,
  name,
  description,
  price,
  discount,
}: IProduct) => {
  const { user } = useContext(ProfileContext);
  const [count, setCount] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(true);
  const [comments, setComments] = useState<IComments[] | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState<string | null>("");
  const [size, setSize] = useState<string | null>(null);
  const [value, setValue] = useState<ratingData | null>(null);
  const { id } = useParams();

  const getAllComments = async () => {
    try {
      const res = await axios.get(`${apiURL}user/comment/${id}`);
      if (res.status === 200) {
        const { comments, ratingAVG, length } = res.data;
        setComments(comments);
        setValue({
          ratingAVG: ratingAVG,
          length: length,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createProductCart = async (_id: string) => {
    if (!size) {
      return toast.warning("size aa songono uu");
    }
    try {
      const res = await axios.post(`${apiURL}create/product/`, {
        _id,
        size,
        count,
      });
      if (res.status === 200) {
        const { comments, ratingAVG, length } = res.data;
        setComments(comments);
        setValue({
          ratingAVG: ratingAVG,
          length: length,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createComment = async () => {
    if (!comment) {
      return toast.warning("Сэтгэгдэл талбар хоосон байна");
    }
    if (!user) {
      return toast.error("Нэвтэрсэн хэрэглэгч сэтгэгдэл үлдээх боломжтой");
    }
    const commentForm = {
      userName: user?.firstName,
      description: comment,
      rating: rating,
    };

    try {
      const res = await axios.post(`${apiURL}user/comment`, {
        commentForm,
        id,
      });
      if (res.status === 200) {
        toast.success("amjillttai ilgeelee");
        setComment("");
        setRating(0);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => {
    createComment();
  };

  const handleSub = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };
  const handleOpen = () => {
    getAllComments();
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const handleSize = (sizeOption: string) => {
    if (size === sizeOption) {
      setSize(null);
    } else {
      setSize(sizeOption);
    }
  };
  const handleProductCart = (id: string) => {
    createProductCart(id);
  };
  useEffect(() => {
    getAllComments();
  }, [comment]);
  return (
    <section>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-row-reverse gap-5">
          <div>
            <img
              src={images[0]}
              alt="img"
              className="w-[422px] h-[521px] rounded-2xl "
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            {images.slice(0, 7).map((img: string, idx: number) => (
              <img
                src={
                  img ??
                  "https://images.unsplash.com/photo-1719937206255-cc337bccfc7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                }
                alt="img"
                className="w-[67px] h-[67px] rounded-sm"
                key={idx}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-end ">
          <Badge className="bg-transparent text-black border border-blue-700 w-16 text-xs text-center font-semibold">
            {isNew ? "Шинэ" : "Хуучин"}
          </Badge>
          <div className="flex gap-4 items-center">
            <h2 className="font-bold text-2xl">{name}</h2>
            <Heart size={22} strokeWidth={1} className="" />
          </div>
          <p>{description}</p>
          <div className="flex flex-col gap-2 my-4">
            <p className="text-base underline">Хэмжээний загвар</p>
            <div className="flex gap-2">
              {["S", "M", "L", "XL", "XXL"].map((sizeOption, idx) => (
                <Button
                  className={`${
                    size === sizeOption ? "bg-primary/90" : "  bg-transparent"
                  } rounded-full  border border-black  text-black dark:text-white  dark:border-white w-8 h-8`}
                  key={idx}
                  onClick={() => {
                    handleSize(sizeOption);
                  }}
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
              <PriceWithDiscount price={price} discount={discount ?? 0} />
            </div>
            <Button
              className="bg-[#2563EB]"
              onClick={() => {
                handleProductCart(_id);
              }}
            >
              Сагсанд нэмэх
            </Button>
          </div>
          <div>
            <div className="mb-1">
              <span className="mr-2 text-sm">Үнэлгээ</span>
              <Button
                className="text-sm text-[#2563EB] underline"
                variant="ghost"
                onClick={handleOpen}
              >
                {open ? "Бүгдийн харах" : "Бүгдийн хураах"}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Rating
                className="w-5 h-5"
                style={{ maxWidth: 120 }}
                value={value?.ratingAVG ?? 0}
                isRequired
              />
              <span className="text-sm text-[#09090B]">{value?.ratingAVG}</span>
              <span className="text-sm">сэтгэгдэл ({value?.length})</span>
            </div>
          </div>
        </div>
        <div></div>
        <RateComment
          handleClick={handleClick}
          setComment={setComment}
          comment={comment}
          rating={rating}
          setRating={setRating}
          comments={comments}
          isOpen={open}
        />
      </div>
    </section>
  );
};

export default DetailCart;
