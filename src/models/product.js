import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  productName: {
    require: true,
    type: String,
    minlenght: 2,
    maxlenght: 100,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, //no permita valores negativos
    max: 10000, //chequear con front
  },
  description: {
    require: true,
    type: String,
    minlenght: 2,
    maxlenght: 200
  },
  urlImg: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('product', productSchema);

export default Product;
