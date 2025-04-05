import express, { Router } from "express";
import  {fetchAllItems}  from "../controllers/fetch.controller.js";

const router = express.Router();

router.get("/items",fetchAllItems); // Fetch all items from the database

export default router;