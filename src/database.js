import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

mongoose.connect(process.env.URL);

const connection = mongoose.connection;

connection.once('open', () => {
 console.log('BD Conectada');
});
