import { Router } from "express";
import { addToCart, getCarts } from "../controllers/cartController.js";


const router = Router();
router.get("/:userId", getCarts);
router.post('/addtocart/:userId', addToCart)

export default router;
