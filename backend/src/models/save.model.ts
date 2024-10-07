import { model, Schema } from "mongoose";

interface ISaveProduct {
  user_id: Schema.Types.ObjectId;
  product_id: [Schema.Types.ObjectId];
}

const saveProductSchema = new Schema<ISaveProduct>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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

const SaveProduct = model<ISaveProduct>("Category", saveProductSchema);
export default SaveProduct;
