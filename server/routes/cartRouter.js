import { Router } from "express";
import { addToCart, decreaseCart, getCarts, increaseCart, updateQuantityCart } from "../controllers/cartController.js";


const router = Router();
router.get("/:userId", getCarts);
router.post('/addtocart/:userId', addToCart)
router.post('/increase/:userId', increaseCart)
router.post('/decrease/:userId', decreaseCart)
router.post('/update/quantity/:userId', updateQuantityCart)
export default router;
