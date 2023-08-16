import { Router } from "express";
import CartManager from "../classes/cartManager.class.js";

const router = Router();
const cartManager = new CartManager();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const cart = await cartManager.getCartById(id);
    res.send(cart);
});

router.get("/", (req, res) => {
    const carts = cartManager.getCarts();
    res.send(carts);
});

router.post("/", (req, res) => {
    cartManager.createCart();
    res.send({ status: "success" });
});

router.post("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    await cartManager.addToCart(cartId, productId);
    res.send({ status: "success" });
});

export default router;
