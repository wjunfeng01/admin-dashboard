import express from "express";
import {getAdmins, getUserPerformance} from "../controllers/management.js"

const router = express.Router();

router.get("/admins", getAdmins); 
//input params from frontend depending on input ID of user
router.get("/performance/:id", getUserPerformance)

export default router;
