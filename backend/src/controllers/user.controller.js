import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js"
import jwt from "jsonwebtoken"

const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,username} = req.body
    
    if([name,email,password,username].some((field)=>(field?.trim()===""))){
        throw new ApiError(400,"All fields are required")
    }

    const existinguser = await User.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(existinguser){
        throw new ApiError(400,"User already exists")
    }

    const profilePicLocalPath = req.files?.profilepic[0]?.path;
    
    //upload file on cloudinary
    const profilePic = await uploadOnCloudinary(profilePicLocalPath)

    if(!profilePic){
        throw new ApiError(400,"Profile picture is required")
    }

    const user = await User.create({
        name,
        email,
        password,
        username,
        profilepic:profilePic.url
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user : createdUser,
                accessToken,
                refreshToken
            },
            "User registered successfully"
        )
    )
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password,username} = req.body

    if(!email && !username){
        throw new ApiError(400,"Email or username is required")
    }

    const user = await User.findOne({
        $or:[{email},{username}]
    })

    if(!user){
        throw new ApiError(400,"User not found")
    }

    const isPasswordValid = await user.comparePassword(password)

    if(!isPasswordValid){
        throw new ApiError(400,"Invalid password")
    }

    const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user : createdUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )
}) 

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,
            {},
            "User logged out successfully"
        )
    )
})

const refreshAccessToken = asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id)

        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }

        if(user.refreshToken !== incomingRefreshToken){
            throw new ApiError(401,"Refresh token is expired or used")
        }

        const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(200,
                {
                    user : loggedInUser,
                    accessToken,
                    refreshToken
                },
                "Access token refreshed successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const changePassword = asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword} = req.body

    if(!oldPassword || !newPassword){
        throw new ApiError(400,"All fields are required")
    }

    const user = await User.findById(req.user._id)

    const isPasswordValid = await user.comparePassword(oldPassword)

    if(!isPasswordValid){
        throw new ApiError(400,"Invalid password")
    }

    user.password = newPassword

    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200,
            {},
            "Password changed successfully"
        )
    )
})

const changeUsername = asyncHandler(async(req,res)=>{
    const {username} = req.body

    if(!username){
        throw new ApiError(400,"Username is required")
    }

    const user = await User.findById(req.user._id)

    user.username = username

    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200,
            {
                user
            },
            "Username changed successfully"
        )
    )
})

const changeProfilepic = asyncHandler(async (req,res)=>{
    const profilePicLocalPath = req.file?.profilepic[0]?.path;
    
    //upload file on cloudinary
    const profilePic = await uploadOnCloudinary(profilePicLocalPath)

    if(!profilePic){
        throw new ApiError(400,"Profile picture is required")
    }

    const user = await User.findById(req.user._id)

    user.profilepic = profilePic.url

    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200,
            {
                user
            },
            "Profile picture changed successfully"
        )
    )
})

const getUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,
            {
                user
            },
            "User fetched successfully"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    changeUsername,
    changeProfilepic,
    getUser
}