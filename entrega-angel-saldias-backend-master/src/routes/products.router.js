import {Router} from 'express';
import ProductManager from '../classes/productManager.class.js';

const router = Router();


const productManager = new ProductManager();

router.get('/', (req, res) => {
    const products =  productManager.getProducts(req.query.limit);
    res.send(products);
});

router.get('/:pid', async (req, res) => {
    const producto = await productManager.getProductById(req.params.pid);
    res.send(producto);
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const product = req.body;
    
    productManager.addProduct(product);
    req.socketServer.emit('products', productManager.getProducts());
    res.send({ status: "success" });
});

router.put("/:pid",  (req, res) => {
    const productId = req.params.pid;
    const product = req.body;
    productManager.updateProduct(productId, product);
    req.socketServer.emit('products', productManager.getProducts());
    res.send({ status: "success" });
})

router.delete("/:pid", (req, res) => {
    const productId = req.params.pid;
    productManager.deleteProduct(productId);
    req.socketServer.emit('products', productManager.getProducts());
    res.send({ status: "success" });
})

export default router;