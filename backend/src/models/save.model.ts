import { model, Schema } from "mongoose";

interface ISaveProduct {
  user_id: Schema.Types.ObjectId;
  products_id: [
    {
      product_id: Schema.Types.ObjectId;
    }
  ];
}

const saveProductSchema = new Schema<ISaveProduct>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products_id: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SaveProduct = model<ISaveProduct>("SaveProduct", saveProductSchema);
export default SaveProduct;
