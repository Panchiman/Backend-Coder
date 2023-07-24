import { Router } from "express";
import CartManager from "../daos/mongodb/classes/cartManager.class.js";

const router = Router();
const cartManager = new CartManager();

router.get("/:id", async (req, res) => {
    let user = req.session.user;
    const id = req.params.id;
    const bole = true;
    const cart = await cartManager.getCartById(id,bole);
    if (!cart) {
        res.status(404).send({ status: "error", message: "Cart not found" });
        return;
    }
    const carrito = cart.products;
    let carritofinal = [];
    function listaCarrito (){
        for (let index = 0; index < carrito.length; index++) {
            carritofinal.push(carrito[index].product)
        }
    }
    
    listaCarrito();
    const carritoandUser ={
        carritofinal,
        user
    }
    console.log(carrito)
    res.render('cart',{carritoandUser});
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

router.delete("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = await cartManager.deleteFromCart(cartId, productId);
    if (!cart) {
        res.status(404).send({ status: "error", message: "Cart or product not found" });
        return;
    }
    res.send({ status: "success" });
})
router.delete("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    await cartManager.clearCart(cartId);
    res.send({ status: "success" });
})

router.put("/:cid", async (req, res) => {
    const products = req.body;
    const cartId = req.params.cid;
    await cartManager.updateCart(cartId, products);
    res.send({ status: "success" });
})

router.put("/:cid/products/:pid", async (req, res) => {
    const products = req.body;
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cartManager.updateProductQuantity(cartId, productId, products);
})

export default router;
