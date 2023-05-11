import express from "express";
import { getSales } from "../controllers/sales.js";

const router = express.Router();

//one endpoint for 4 sales page
router.get("/sales", getSales);

export default router;
