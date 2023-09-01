import express from "express"
import {getUsers} from "../controller/user"
const router = express.Router()

router.get("/", getUsers)
export default router