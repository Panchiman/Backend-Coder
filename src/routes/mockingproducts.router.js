import {Router} from 'express';
import { generateProduct } from "../utils.js";
import { generateProducts } from '../services/mockingproducts.service.js';

const router = Router();


router.get('/',async (req, res) => {
    let productsNumber = Number(req.query.number);
    const products = await generateProducts(productsNumber)
    res.send(products)
})

export default router;