import { Router } from "express";
import { getCartService, deleteFromCartService, getCartsService,createCartService, updateProductQuantityService, clearCartService, addToCartService, updateCartService, purchaseService } from "../services/carts.service.js";
import TicketDTO from "../services/ticket.service.js";

const router = Router();

router.get("/:id", async (req, res) => {
    let user = req.session.user;
    const id = req.params.id;
    const bole = true;
    const carritoandUser = await getCartService(user, id, bole);
    res.render('cart',{carritoandUser});
});

router.get("/", (req, res) => {
    const carts = getCartsService();
    res.send(carts);
});

router.post("/", (req, res) => {
    createCartService();
    res.send({ status: "success" });
});

router.post("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await addToCartService(cartId, productId);
    res.send({ status: "success" });
});

router.delete("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await deleteFromCartService(cartId, productId);
    res.send({ status: "success" });
})
router.delete("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    await clearCartService(cartId);
    res.send({ status: "success" });
})

router.put("/:cid", async (req, res) => {
    const products = req.body;
    const cartId = req.params.cid;
    await updateCartService(cartId, products);
    res.send({ status: "success" });
})

router.put("/:cid/products/:pid", async (req, res) => {
    const products = req.body;
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await updateProductQuantityService(cartId, productId, products);
})

router.put("/:cid/purchase", async (req, res) => {
    console.log("sesion email")
    console.log(req.user.email)
    const ticket = await purchaseService(req.params.cid, req.user.email)
    if (!ticket){
        res.send({error: "Wrong cart!"})
    }
    else{
        const ticketFinal = new TicketDTO(ticket.products,ticket.price,req.user.email)
        res.send(ticketFinal)

    }
})

export default router;
