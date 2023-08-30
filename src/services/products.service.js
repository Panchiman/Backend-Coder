
import ProductManager from '../daos/mongodb/classes/productManager.class.js';
import config from '../config/config.js';
import { addProductController } from '../controllers/products.controller.js';

const productManager = new ProductManager();

export const getProductsService = async (user,limit, page, sort, filter, filterVal) => {
    if (!user) throw new Error ("No user found")
    if (isNaN(limit)) {
        limit = 10;
    }
    if (isNaN(page)) {
        page = 1;
    }
    if (isNaN(sort)) {
        sort = 0;
    }
    
    let products = await productManager.getProducts(limit, page, sort, filter, filterVal);
    products.prevLink = products.hasPrevPage?`http://localhost:${config.port}/products/?page=${products.prevPage}&limit=${limit}&sort=${sort}&filter=${filter}&filterVal=${filterVal}`:'';
    products.nextLink = products.hasNextPage?`http://localhost:${config.port}/products/?page=${products.nextPage}&limit=${limit}&sort=${sort}&filter=${filter}&filterVal=${filterVal}`:'';
    
    if (page<=0 || page>products.totalPages){
        throw new Error ("Page not found") ;
    }
    let productsandUser = {
        products,
        user
    }
    return productsandUser
}

export const getProductByIdService = async (productId, user) => {
    const producto = await productManager.getProductById(productId);
    const productoandUser = {
        producto,
        user
    }
    return productoandUser;
}

export const deleteProductService = async (productId) => {
    productManager.deleteProduct(productId);

}
export const updateProductService = async (productId, product) => {
    productManager.updateProduct(productId, product);

}
export const addProductService = async (product) => {
    await addProductController(product)
    productManager.addProduct(product);
}

export const substractToProductStock = async (productId, amount) =>{
    const product = await productManager.getProductById(productId)
    if (!product){
        return {error:"Product don't exist"}
    }
    if (product.stock < amount){
        return false
    }
    else{
        await productManager.updateProduct(productId, {stock: product.stock - amount})
        return true
    }
}
