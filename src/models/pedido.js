import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  pedido : [{
    productName : String,
    urlImg: {
      type: String,
      required: true,
    },
    category : String,
    qty: {
      type: Number,
      required: true,
      min: 0, 
      max: 100,
    },
    price : Number
     }],
  email: {
    type: String,
    require: true,
   },
  estado:{
    type: String,
    maxlenght: 100
 },
 total: {
  type: Number,
  required: true,
  min: 0, 
  max: 10000,
},
date: {
  type: Date,
},
 
});

const Pedido = mongoose.model('pedido', pedidoSchema);

export default Pedido;
