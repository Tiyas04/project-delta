import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        friends:{
            type:[{
                user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User"
                },
                createdAt:{
                    type:Date,
                    default:Date.now
                }
            }],
        },
        pendingRequest:{
            type:[{
                user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User"
                },
                createdAt:{
                    type:Date,
                    default:Date.now
                }
            }],
        }
    },
    {
        timestamps:true
    }
)

export const Friend = mongoose.model("Friend",FriendSchema)