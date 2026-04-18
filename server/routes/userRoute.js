import express from "express"
import { authUser } from "../middleware/authMiddleware.js"
import { getUserProfile, addRecentSearchCity } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get('/', authUser, getUserProfile)
userRouter.post('/store-recent-search', authUser, addRecentSearchCity)

export default userRouter