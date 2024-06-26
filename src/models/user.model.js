import mongoose,{Schema} from "mongoose";

import jwt from "jsonwebtoken"
import  bcrypt from "bcrypt"

const userSchema = new Schema({
  username: {
    type : String,
    index:true,
    trim:true,
    lowercase:true,
    unique:true
  },
  email: {
    type : String,
    index:true,
    trim:true,
        required:true,
    lowercase:true,
    unique:true
  },
  fullName: {
    type : String,
    index:true,
    trim:true,
        required:true,
    lowercase:true,
    unique:true
  },
  avatar:{
    type : String, //cloudinary url
    // required:true,
  },
  coverImage:{
    type:String, //cloudinary url
  },
  watchHistory:[
    {
      type : Schema.Types.ObjectId,
      ref:"video"
    }
  ],
  password:{
    type:String, //cloudinary urlr
    required: [true,'passwrod is required']

  },
  refreshToken:{
    type:String
  }
},{timestamps:true})


userSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return next

  this.password = await bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
  jwt.sign(
    {
      _id:this._id,
      email:this.email,
      username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,{
      expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken=function(
){
  jwt.sign(
    {
      _id:this._id,
      email:this.email,
      username:this.username
    },
    process.env.REFRESH_TOKEN_SECRET,{
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User",userSchema)
