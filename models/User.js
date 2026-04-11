import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // TODO: Define schema fields
  name:{
    type: String,
    required: true
  },

  email:{
    type: String,
    required: true,
    unique: true
  },

  password:{
    type: String,
    required: true,
  },

  createdAt:{
    type: Date,
    required: false,
    default: Date.now
    
  }



});

const User = mongoose.model("User", userSchema);
export default User;

