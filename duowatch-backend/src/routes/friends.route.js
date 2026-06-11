import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendsList,
    getPendingRequests
} from "../controllers/friends.controller.js";

const router = Router()

router.use(verifyJWT)

router.route("/").get(getFriendsList)
router.route("/pending-requests").get(getPendingRequests)
router.route("/send-friend-request").post(sendFriendRequest)
router.route("/accept-friend-request").post(acceptFriendRequest)
router.route("/reject-friend-request").post(rejectFriendRequest)

export default router;