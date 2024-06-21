import { asyncHandler } from "../utils/asynceHandler.js";


const registerUser = asyncHandler(async (req,res) => {
  res.status(200).json({
    message:"thi is fahim"
  })
})


export {registerUser}
// export default registerUser