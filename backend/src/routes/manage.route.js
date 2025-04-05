import express from "express"

import { placeItem } from "../controllers/manage.controller.js"
import { simulateItemUsage} from "../controllers/simulation.controller.js"
import {logUsage,showLogs} from "../controllers/log.controller.js"

const router = express.Router()


router.post("/simulate/items", simulateItemUsage)

router.get("/logs",showLogs)

router.post("/log/item",logUsage)

router.post("/place", placeItem)

export default router