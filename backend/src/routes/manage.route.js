import express from "express"

import {} from "../controllers/manage.controller.js"
import {simulateDay, simulateItemUsage} from "../controllers/simulation.controller.js"
import {logUsage,showLogs} from "../controllers/log.controller.js"

const router = express.Router()

router.post("/simulate/day",simulateDay)
router.post("/simulate/items", simulateItemUsage)

router.get("/logs",showLogs)
router.post("/log/item",logUsage)

export default router