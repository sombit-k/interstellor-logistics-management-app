import express from "express";
import {
  identifyWaste,
  returnPlan,
  completeUndocking,
  trackWaste,
} from "../controllers/waste.controller.js";

const router = express.Router();

router.get("/identify", identifyWaste);

router.post("/return-plan", returnPlan);

router.post("/complete-undocking", completeUndocking);

router.post("/track", trackWaste);

export default router;
