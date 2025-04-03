import express from "express"

import {} from "../controllers/manage.controller.js"
import {simulateDay} from "../controllers/simulation.controller.js"
import {} from "../controllers/log.controller.js"

const router = express.Router()

router.post("/identify",simulateDay)

export default router