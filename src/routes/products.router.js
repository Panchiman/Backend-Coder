import {Router} from 'express';
import {productsModel} from '../daos/mongodb/models/product.models.js';
import {getProductsService, getProductByIdService, addProductService, updateProductService, deleteProductService} from '../services/products.service.js';

import passport from "passport";

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
    console.log(productsandUser)
    res.render('allproducts', {productsandUser})
})  


router.get('/:pid', async (req, res) => {
    let user = req.session.user;
    const productoandUser = await getProductByIdService(req.params.pid, user);
    res.render('product',{productoandUser});
});


router.post("/", passport.authenticate('login',{failureRedirect:'/faillogin'}), roleAdminCheck, async (req, res) => {
    const product = req.body;
    addProductService(product);
    res.send({ status: "success" });
});

router.put("/:pid", roleAdminCheck, (req, res) => {
    const productId = req.params.pid;
    const product = req.body;
    updateProductService(productId, product);
    res.send({ status: "success" });
})

router.delete("/:pid", roleAdminCheck, (req, res) => {
    const productId = req.params.pid;
    deleteProductService(productId);
    res.send({ status: "success" });
})



export default router;