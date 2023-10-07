import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
 name:{
    type: String,
    maxlenght: 100,
    require: true
 },
 email: {
    type: String,
    require: true,
    maxlenght: 100,
    unique: true
 },
 password: {
    type: String,
    require: true
 },
 roles: [String],
 activo: Boolean
});


const User = mongoose.model('user',userSchema);

export default User;
