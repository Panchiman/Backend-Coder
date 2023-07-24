import {Router} from 'express';
import ProductManager from '../daos/mongodb/classes/productManager.class.js';
import {productsModel} from '../daos/mongodb/models/product.models.js';

const router = Router();


const productManager = new ProductManager();

router.get('/',async (req, res) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    let user = req.session.user;
    if (!user) return res.redirect('/')
    console.log(user)
    if (isNaN(limit)) {
        limit = 10;
    }
    if (isNaN(page)) {
        page = 1;
    }
    if (isNaN(sort)) {
        sort = 0;
    }
    let filter = req.query.filter;
    let filterVal = req.query.filterVal;
    
    let products = await productManager.getProducts(limit, page, sort, filter, filterVal);
    products.prevLink = products.hasPrevPage?`http://localhost:8080/products/?page=${products.prevPage}&limit=${limit}&sort=${sort}&filter=${filter}&filterVal=${filterVal}`:'';
    products.nextLink = products.hasNextPage?`http://localhost:8080/products/?page=${products.nextPage}&limit=${limit}&sort=${sort}&filter=${filter}&filterVal=${filterVal}`:'';
    //console.log(products)
    if (page<=0 || page>products.totalPages){
        res.status(404).send({ status: "error", message: "Page not found" });
    }
    let productsandUser = {
        products,
        user
    }
    console.log(productsandUser)
    console.log(productsandUser.user.name)
    console.log(productsandUser.products.docs)
    res.render('allproducts', {productsandUser})
})

router.get("/productos", async (req, res) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    if (isNaN(limit)) {
        limit = 10;
    }
    if (isNaN(page)) {
        page = 1;
    }
    if (isNaN(sort)) {
        sort = 0;
    }
    let filter = req.query.filter;
    let filterVal = req.query.filterVal;
    console.log(limit, page, sort)
    let productos = await productManager.getProducts(limit, page, sort, filter, filterVal);
    productos.prevLink = productos.hasPrevPage?`http://localhost:8080/students?page=${productos.prevPage}`:'';
    productos.nextLink = productos.hasNextPage?`http://localhost:8080/students?page=${productos.nextPage}`:'';
    productos.isValid= !(page<=0||page>productos.totalPages)
    if (page<=0 || page>productos.totalPages){
        res.status(404).send({ status: "error", message: "Page not found" });
    }
    res.send({ productos }); 
});

router.get('/:pid', async (req, res) => {
    const producto = await productManager.getProductById(req.params.pid);
    let user = req.session.user;
    const productoandUser = {
        producto,
        user
    }
    console.log(productoandUser.user)
    res.render('product',{productoandUser});
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const product = req.body;
    console.log(product)
    productManager.addProduct(product);
    res.send({ status: "success" });
});

router.put("/:cid",  (req, res) => {
    const productId = req.params.cid;
    const product = req.body;
    productManager.updateProduct(productId, product);
    res.send({ status: "success" });
})

router.delete("/:pid", (req, res) => {
    const productId = req.params.pid;
    productManager.deleteProduct(productId);
    res.send({ status: "success" });
})

export default router;