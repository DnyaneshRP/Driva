import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import { agencyReg } from "../controllers/agencyController.js";

const agencyRouter = express.Router()

agencyRouter.post('/', authUser, agencyReg)

export default agencyRouter