import express from "express";
import {getProducts, getCustomers, getTransactions, getGeography } from "../controllers/client.js"

const router = express.Router();

//runs getProducts fnc from controller when products is clicked
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
