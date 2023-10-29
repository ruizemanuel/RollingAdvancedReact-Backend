import mongoose, { Schema } from "mongoose";

const productHistorySchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date
  },
});

const ProductHistory = mongoose.model('productHistory', productHistorySchema);

export default ProductHistory;
