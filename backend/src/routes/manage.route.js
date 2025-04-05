import express from "express"

import { placeItem, placementRecommendations, search, retrieve, place } from "../controllers/manage.controller.js"
import {simulateDay, simulateItemUsage} from "../controllers/simulation.controller.js"
import {logUsage,showLogs} from "../controllers/log.controller.js"

const router = express.Router()

router.post("/simulate/day",simulateDay)
router.post("/simulate/items", simulateItemUsage)

router.get("/logs",showLogs)
router.post("/log/item",logUsage)
router.post("/place", placeItem)

router.post("/placement", placementRecommendations);
router.get("/search", search);
router.post("/retrieve", retrieve);
router.post("/place", place);

export default router