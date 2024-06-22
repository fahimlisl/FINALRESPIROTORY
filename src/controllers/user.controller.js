import { asyncHandler } from "../utils/asynceHandler.js";

import { ApiError } from "../utils/apiError.js";


import {User} from "../models/user.model.js";


import {uploadOnCloudinary} from "../utils/cloudinary.js"

import {ApiResponse} from "../utils/apiResponse.js"
const registerUser = asyncHandler(async (req,res) => {
  // res.status(200).json({
  //   message:"thi is fahim"
  // })



  // get user detials form forntend
  // validation - not emtpy
  // chemeck if user alreaduy exists : username , email
  // check of rimages , check for avtyar
  // upload thwem to cloudinary,avtar
  // create user objcet - create4 entry in db
  // remove password and refrehs token filed from response
  // check for user creation
  // return res
  


  const {fullName,email,username,password } = req.body
  console.log("email: ",email)
  console.log("fullName: ",fullName)
  console.log("password: ",password)

  // if (fullName===""){
  //   throw new ApiError(400,"fullname is required")
  // }
  // for advance 
  if(
    [fullName,email,username,password].some((field) => field?.trim() === "")
  ){
    throw new ApiError(400,"all fields are required")
  }

  const existedUser = await User.findOne({
    $or: [{username},{email}]
  })

  if(existedUser){
    throw new ApiError(409,"User with emial or uswrename3 already exists ")
  }


  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;


  if (!avatarLocalPath) {
    throw new ApiError(400,"avatar fieldd is required")
  }



  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(400,"avatar fiel is required")
  }

  const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase(),
  })


  const createdUswer = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUswer) {
    throw new ApiError(500,"something went wrong while registering uswer")
  }
  return res.status(201).json(
    new ApiResponse(200,createdUswer,"Uswer regsiterd sussfully")
  )
})


export {registerUser}