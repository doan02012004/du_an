
import mongoose, { Schema } from "mongoose";

const cartItem = new Schema(
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'products',
      },
      attributeId:{
        type:String
      },
      quantity:{
        type:Number
      }
    }
  );
const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'users',
      required: true,
    },
    items: [cartItem]
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("carts", cartSchema);
