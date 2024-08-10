import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    password: {
      type: String,
      required: true,
    },
    token:{
      type:String,
      default:''
    }
  },
  { timestamps: true }
);
 const userModel = mongoose.model('User',userSchema)
 export default userModel
