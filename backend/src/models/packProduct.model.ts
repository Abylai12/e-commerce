import { model, Schema } from "mongoose";

interface IPackProduct {
  user_id: Schema.Types.ObjectId;
  products: [
    {
      _id?: Schema.Types.ObjectId;
      product_id: Schema.Types.ObjectId;
      quantity: Number;
      size: String;
    }
  ];
}

const packProductSchema = new Schema<IPackProduct>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        size: {
          type: String,
          enum: ["S", "M", "L", "XL", "XXL"],
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const PackProduct = model<IPackProduct>("PackProduct", packProductSchema);
export default PackProduct;
