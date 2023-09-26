import { Router } from "express";
import { getCartService, deleteFromCartService, getCartsService,createCartService, updateProductQuantityService, clearCartService, addToCartService, updateCartService, purchaseService } from "../services/carts.service.js";
import TicketDTO from "../services/DTO/ticket.service.js";

const router = Router();

router.get("/:id", async (req, res, next) => {
    try {
        let user = req.session.user;
        const id = req.params.id;
        const bole = true;
        const carritoandUser = await getCartService(user, id, bole);
        req.logger.debug(carritoandUser.carritofinal)
        res.render('cart',{carritoandUser});
        
    } catch (error) {
        return next(error)
    }
});

router.get("/", async (req, res) => {
    const carts = await getCartsService();
    res.send({status:"success", payload: carts});
});

router.post("/", (req, res) => {
    createCartService();
    res.send({ status: "success" });
});

router.post("/:cid/products/:pid", async (req, res,next) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        await addToCartService(cartId, productId);
    } catch (error) {
        return next(error)
    }
    res.send({ status: "success" });
});

router.delete("/:cid/products/:pid", async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        if (await deleteFromCartService(cartId, productId)){
            req.logger.info("Borrado del carrito")
            res.send({ status: "success" });
        }
        
    } catch (error) {
        req.logger.error(error)
        return next(error)
    }
})
router.delete("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        await clearCartService(cartId);
        res.send({ status: "success" });
        
    } catch (error) {
        req.logger.error(error)
        return next(error)
    }
})

router.put("/:cid", async (req, res) => {
    const products = req.body;
    const cartId = req.params.cid;
    await updateCartService(cartId, products);
    res.send({ status: "success" });
})

// router.put("/:cid/products/:pid", async (req, res) => {
//     const products = req.body;
//     const cartId = req.params.cid;
//     const productId = req.params.pid;
//     await updateProductQuantityService(cartId, productId, products);
// })

router.put("/:cid/purchase", async (req, res) => {
    const ticket = await purchaseService(req.params.cid, req.user.email)
    res.send(ticket)
    
})

export default router;
