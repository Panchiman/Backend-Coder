import {Router} from 'express';
import {productsModel} from '../daos/mongodb/models/product.models.js';
import {getProductsService, getProductByIdService, addProductService, updateProductService, deleteProductService} from '../services/products.service.js';

import passport from "passport";
import { addProductController } from '../controllers/products.controller.js';
import { updateUserService, updateUserServiceWithMail } from '../services/users.service.js';

const router = Router();

export const roleAdminCheck = (req, res, next) => {
    if (req.user.role == "user"){
        next()
    }
    else{
        res.send({error: "You don't have access"})
    }
}

const lastSessionRegister = (req, res, next) => {
    const userSession = req.session.user
    console.log(req.session.user)
    if (!userSession){
        return res.redirect('/')
    }
    const user = {lastSession: new Date()}
    console.log(user)
    updateUserServiceWithMail(req.session.user.email,user)
    next();
};

router.get('/', lastSessionRegister, async (req, res) => {
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


router.get('/:pid', lastSessionRegister, async (req, res) => {
    let user = req.session.user;
    const productoandUser = await getProductByIdService(req.params.pid, user);
    res.render('product',{productoandUser});
});


router.post("/", async (req, res, next) => {
    if (req.session.user.role == "premium"){
        try {
            const product = req.body;
            const creadorEmail = req.session.user.email;
            console.log(req.session.user.email)
            await addProductService(product, "premium", creadorEmail)
        } catch (error) {
            return next(error)
        }

    }
    else if(req.session.user.role == "admin"){
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

router.put("/:pid", async (req, res) => {
    const productId = req.params.pid;
    const product = req.body;
    if(req.session.user.role == "premium"){
        const user = req.session.user
        const productOld = await getProductByIdService(productId, user)
        if (productOld.producto.creatorEmail == user.email){
            updateProductService(productId, product);
            res.send({ status: "success" });
        }
        else{
            res.send({error: "acceso denegado"})
        }
    }
    else if(req.session.user.role == "admin"){
        updateProductService(productId, product);
        res.send({ status: "success" });
    }
    else{
        res.send({error: "acceso denegado"})
    }
})

router.delete("/:pid", async (req, res) => {
    const productId = req.params.pid;
    if(req.session.user.role == "premium"){
        const user = req.session.user
        const productOld = await getProductByIdService(productId, user)
        if (productOld.producto.creatorEmail == user.email){
            deleteProductService(productId);
            res.send({ status: "success" });
        }
        else{
            res.send({error: "acceso denegado"})
        }
    }
    if(req.session.user.role == "admin"){
        deleteProductService(productId);
        res.send({ status: "success" });
    }
    else{
        res.send({error: "acceso denegado"})
    }
})



export default router;