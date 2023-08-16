import { Router } from "express";
import ProductManager from '../classes/productManager.class.js';
const router = Router();

const productManager = new ProductManager();

router.get('/', (req, res) => {


    res.render('realTimeProducts')
})

export default router;