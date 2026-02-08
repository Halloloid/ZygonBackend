import express from "express"
import { leaderboard, updateScore } from "./api.controller"

const apiRoute = express.Router()

apiRoute.get("/leaderboard",leaderboard)
apiRoute.post("/updatescore",updateScore)

export default apiRoute