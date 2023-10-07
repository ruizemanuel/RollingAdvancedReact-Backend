import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  pedido : [{
    productName : String,
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
  min: 0, //no permita valores negativos
  max: 10000, //chequear con front
},
 
});

const Pedido = mongoose.model('pedido', pedidoSchema);

export default Pedido;



// const pedidoSchema = new Schema({
//   productName: {
//     require: true,
//     type: String,
//     minlenght: 2,
//     maxlenght: 100,
//     unique: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0, //no permita valores negativos
//     max: 10000, //chequear con front
//   },
//   uid: {
//     require: true,
//     type: String
//   },
 
// });
