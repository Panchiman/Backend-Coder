
import ProductManager from '../daos/mongodb/classes/productManager.class.js';
import config from '../config/config.js';
import { addProductController } from '../controllers/products.controller.js';
import ProductDTO from './DTO/productDTO.service.js';
import Mail from '../config/nodemailer.config.js';
import { getUserByEmailService, getUserByIdService } from './users.service.js';

const productManager = new ProductManager();
const mail = new Mail();

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
    products.prevLink = products.hasPrevPage?`/products/?page=${products.prevPage}&limit=${limit}&sort=${sort}&filter=${filter}&filterVal=${filterVal}`:'';
    products.nextLink = products.hasNextPage?`/products/?page=${products.nextPage}&limit=${limit}&sort=${sort}&filter=${filter}&filterVal=${filterVal}`:'';
    
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
    const product = await productManager.getProductById(productId)
    if (product.creatorRole == "premium"){
        console.log(product.creatorEmail)
        const html = "<h1>Tu producto:"+ product.title +" fue eliminado de la tienda</h1>"
        const nodemail = await mail.send(product.creatorEmail, "Un producto creado por ti fue eliminado", html)
    }
    await productManager.deleteProduct(productId);
}
export const updateProductService = async (productId, product) => {
    await productManager.updateProduct(productId, product);

}
export const addProductService = async (product, role = "Admin", creatorEmail = "admincoder@coder.com") => {
    await addProductController(product)
    const productDTO = new ProductDTO(product, role, creatorEmail)
    productManager.addProduct(productDTO);
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
