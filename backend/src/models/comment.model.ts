import { model, Schema } from "mongoose";

interface IComment {
  comments: [
    {
      userName: string;
      description: string;
      rating: number;
    }
  ];
  product_id: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>(
  {
    comments: [
      {
        userName: {
          type: String,
          required: [true, "Хэрэглэгчийн нэр оруулах"],
        },
        description: {
          type: String,
          required: [true, "Сэтгэгдэл оруулах"],
        },
        rating: {
          type: Number,
        },
      },
    ],
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model<IComment>("Comment", commentSchema);
export default Comment;
