import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.js"

const router = express.Router();

// GET ID REQUEST FROM FRONTEND AND RUN GET USER FUNCTION FROM CONTROLLER
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

export default router;
