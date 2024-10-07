import { model, Schema } from "mongoose";

interface IComment {
  comment: [
    {
      userName: string;
      description: string;
    }
  ];
  product_id: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>(
  {
    comment: [
      {
        userName: {
          type: String,
          required: [true, "Хэрэглэгчийн нэр оруулах"],
        },
        description: {
          type: String,
          required: [true, "Хэрэглэгчийн нэр оруулах"],
        },
      },
    ],
    product_id: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = model<IComment>("Comment", commentSchema);
export default Comment;
