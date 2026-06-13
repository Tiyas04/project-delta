import { Router } from "express"
import {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changePassword,
    changeUsername,
    changeProfilepic,
    getUser
} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "profilepic",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/change-password").post(verifyJWT,changePassword)
router.route("/change-username").post(verifyJWT,changeUsername)
router.route("/change-profilepic").post(verifyJWT,upload.fields([
    {
        name: "profilepic",
        maxCount: 1
    }
]),changeProfilepic)
router.route("/get-user").get(verifyJWT,getUser)

export default router