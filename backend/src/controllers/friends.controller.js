import { Friend } from "../models/friends.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Helper helper to get or create Friend document for a user
const getOrCreateFriendDoc = async (userId) => {
    let friendDoc = await Friend.findOne({ userId });
    if (!friendDoc) {
        friendDoc = await Friend.create({
            userId,
            friends: [],
            pendingRequest: []
        });
        
        // Also update the User document to point to this Friend document
        await User.findByIdAndUpdate(
            userId,
            { Friends: friendDoc._id },
            { new: true }
        );
    }
    return friendDoc;
};

const sendFriendRequest = asyncHandler(async(req, res) => {
    const { recipientId } = req.body;
    const senderId = req.user._id;

    if (!recipientId) {
        throw new ApiError(400, "Recipient ID is required");
    }

    if (senderId.toString() === recipientId.toString()) {
        throw new ApiError(400, "You cannot send a friend request to yourself");
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
        throw new ApiError(404, "Recipient not found");
    }

    const senderFriendDoc = await getOrCreateFriendDoc(senderId);
    const recipientFriendDoc = await getOrCreateFriendDoc(recipientId);

    // Check if already friends
    const isAlreadyFriend = senderFriendDoc.friends.some(
        (f) => f.user && f.user.toString() === recipientId.toString()
    );
    if (isAlreadyFriend) {
        throw new ApiError(400, "You are already friends with this user");
    }

    // Check if recipient has already sent a request to sender (so they can just accept it)
    const hasIncomingRequest = senderFriendDoc.pendingRequest.some(
        (r) => r.user && r.user.toString() === recipientId.toString()
    );
    if (hasIncomingRequest) {
        throw new ApiError(400, "This user has already sent you a friend request. Please accept it instead.");
    }

    // Check if sender has already sent a request to recipient
    const hasSentRequest = recipientFriendDoc.pendingRequest.some(
        (r) => r.user && r.user.toString() === senderId.toString()
    );
    if (hasSentRequest) {
        throw new ApiError(400, "Friend request is already pending");
    }

    // Add sender to recipient's pending requests
    recipientFriendDoc.pendingRequest.push({ user: senderId });
    await recipientFriendDoc.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Friend request sent successfully"));
});

const acceptFriendRequest = asyncHandler(async(req, res) => {
    const { senderId } = req.body;
    const recipientId = req.user._id;

    if (!senderId) {
        throw new ApiError(400, "Sender ID is required");
    }

    const sender = await User.findById(senderId);
    if (!sender) {
        throw new ApiError(404, "Sender not found");
    }

    const recipientFriendDoc = await getOrCreateFriendDoc(recipientId);
    const senderFriendDoc = await getOrCreateFriendDoc(senderId);

    // Find the pending request from sender
    const pendingIndex = recipientFriendDoc.pendingRequest.findIndex(
        (r) => r.user && r.user.toString() === senderId.toString()
    );

    if (pendingIndex === -1) {
        throw new ApiError(400, "No pending friend request from this user");
    }

    // Check if they are already friends
    const isAlreadyFriend = recipientFriendDoc.friends.some(
        (f) => f.user && f.user.toString() === senderId.toString()
    );

    if (!isAlreadyFriend) {
        recipientFriendDoc.friends.push({ user: senderId });
        senderFriendDoc.friends.push({ user: recipientId });
    }

    // Remove sender from recipient's pendingRequest array
    recipientFriendDoc.pendingRequest.splice(pendingIndex, 1);

    await recipientFriendDoc.save();
    await senderFriendDoc.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Friend request accepted successfully"));
});

const rejectFriendRequest = asyncHandler(async(req, res) => {
    const { senderId } = req.body;
    const recipientId = req.user._id;

    if (!senderId) {
        throw new ApiError(400, "Sender ID is required");
    }

    const recipientFriendDoc = await getOrCreateFriendDoc(recipientId);

    // Find pending request index
    const pendingIndex = recipientFriendDoc.pendingRequest.findIndex(
        (r) => r.user && r.user.toString() === senderId.toString()
    );

    if (pendingIndex === -1) {
        throw new ApiError(400, "No pending friend request from this user");
    }

    // Remove sender from recipient's pendingRequest array
    recipientFriendDoc.pendingRequest.splice(pendingIndex, 1);
    await recipientFriendDoc.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Friend request rejected successfully"));
});

const getFriendsList = asyncHandler(async(req, res) => {
    const userId = req.user._id;

    const friendDoc = await getOrCreateFriendDoc(userId);
    const populatedFriendDoc = await Friend.findById(friendDoc._id).populate({
        path: "friends.user",
        select: "name username email profilepic"
    });

    const friends = populatedFriendDoc ? populatedFriendDoc.friends.map(f => f.user).filter(Boolean) : [];

    return res
        .status(200)
        .json(new ApiResponse(200, { friends }, "Friends list fetched successfully"));
});

const getPendingRequests = asyncHandler(async(req, res) => {
    const userId = req.user._id;

    const friendDoc = await getOrCreateFriendDoc(userId);
    const populatedFriendDoc = await Friend.findById(friendDoc._id).populate({
        path: "pendingRequest.user",
        select: "name username email profilepic"
    });

    const pendingRequests = populatedFriendDoc ? populatedFriendDoc.pendingRequest.map(r => r.user).filter(Boolean) : [];

    return res
        .status(200)
        .json(new ApiResponse(200, { pendingRequests }, "Pending friend requests fetched successfully"));
});

export {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendsList,
    getPendingRequests
};