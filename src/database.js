import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

// const url = 'mongodb://127.0.0.1:27017/crudBurgersC14i' //localhost = 127.0.0.1
//const url = 'mongodb+srv://crudBurgerC14i:4aJTVuvlOORAYXrK@cluster0.qrmjuxh.mongodb.net/crudBurgersC14i' 

//mongoose.connect(url);
mongoose.connect(process.env.URL);

const connection = mongoose.connection;

connection.once('open', () => {
 console.log('BD Conectada');
});
