import {Router} from 'express';
import {productsModel} from '../daos/mongodb/models/product.models.js';
import {getProductsService, getProductByIdService, addProductService, updateProductService, deleteProductService} from '../services/products.service.js';

import passport from "passport";
import { addProductController } from '../controllers/products.controller.js';

const router = Router();

export const roleAdminCheck = (req, res, next) => {
    if (req.user.role == "user"){
        next()
    }
    else{
        res.send({error: "You don't have access"})
    }
}

router.get('/',async (req, res) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    let user = req.session.user;
    let filter = req.query.filter;
    let filterVal = req.query.filterVal;
    const productsandUser = await getProductsService(user,limit, page, sort, filter, filterVal)
    req.logger.debug(productsandUser)
    res.render('allproducts', {productsandUser})
})


router.get('/:pid', async (req, res) => {
    let user = req.session.user;
    const productoandUser = await getProductByIdService(req.params.pid, user);
    res.render('product',{productoandUser});
});


router.post("/", async (req, res, next) => {
    if(req.session.user.role == "admin"){
        try {
            const product = req.body;
            await addProductService(product)
            
        } catch (error) {
            return next(error)
        }
    }
    else{
        res.send({error: "acceso denegado"})
    }
    res.send({status:"success"})
});

router.put("/:pid", (req, res) => {
    if(req.session.user.role == "admin"){
        const productId = req.params.pid;
        const product = req.body;
        updateProductService(productId, product);
        res.send({ status: "success" });
    }
    else{
        res.send({error: "acceso denegado"})
    }
})

router.delete("/:pid", (req, res) => {
    if(req.session.user.role == "admin"){
        const productId = req.params.pid;
        deleteProductService(productId);
        res.send({ status: "success" });
    }
    else{
        res.send({error: "acceso denegado"})
    }
})



export default router;