
import CartManager from "../daos/mongodb/classes/cartManager.class.js";
import TicketManager from "../daos/mongodb/classes/ticketManager.class.js";
import UserManager from "../daos/mongodb/classes/userManager.class.js";
import { substractToProductStock } from "./products.service.js";
import TicketDTO from "./DTO/ticket.service.js";
import CustomError from "./DTO/customError.service.js";
import { addCartByIdController, addToCartController } from "../controllers/carts.controller.js";
import Mail from "../config/nodemailer.config.js";

const cartManager = new CartManager();
const userManager = new UserManager();
const ticketManager = new TicketManager();
const mail = new Mail();

export const getCartService = async (user, id, bole) => {
    const cart = await cartManager.getCartById(id,bole);
    await addCartByIdController(cart)
    const carrito = cart.products;
    let carritofinal = [];
    function listaCarrito (){
        for (let index = 0; index < carrito.length; index++) {
            let productocarrito = {}
            productocarrito = {product: carrito[index].product, amount:carrito[index].amount}
            carritofinal.push(productocarrito)
        }
    }
    
    listaCarrito();
    const carritoandUser ={
        carritofinal,
        user
    }
    return carritoandUser;
}

export const deleteFromCartService = async (cartId, productId) => {
    if (cartManager.deleteFromCart(cartId, productId)){
        return true
    }
    else{
        throw new Error ("Cart not found");
    }
}

export const getCartsService = async () => {
    const carts = cartManager.getCarts();
    return carts;
}

export const addToCartService = async (cartId, productId) => {
    await addToCartController(cartId, productId)
    cartManager.addToCart(cartId, productId);
}
export const clearCartService = async (cartId) => {
    await cartManager.clearCart(cartId);
}
export const updateCartService = async (cartId, products) => {
    await cartManager.updateCart(cartId, products);
}
export const updateProductQuantityService = async (cartId, productId, products) => {
    await cartManager.updateProductQuantity(cartId, productId, products);
    
}

export const createCartService = async () => {
    cartManager.createCart();
}

export const purchaseService = async (id, email) =>{
    const user = await userManager.findUserByCart(id)
    if (user.email == email){
        const cart = await cartManager.getCartById(id);
        let carrito = cart.products;
        let counter = 0
        let price = 0
        let productos = []
        let deleteCounter = []
        const carritoLista = []
        for (const item of carrito){
            if (await substractToProductStock (item.product._id, item.amount) == true){
                price = price + item.product.price * item.amount
                productos.push({product:item.product.title, price: item.product.price, amount: item.amount})
                deleteCounter.push(counter)
            }
            else{
                carritoLista.push(item)
            }
            counter = counter + 1
        }
    
        if(carritoLista.length > 0){
            cart.products = []
        }
        else{
            cart.products = carritoLista
        }
        await cart.save();

        const ticket = new TicketDTO(productos,price,email)
        ticketManager.addTicket(ticket)
        function generarCodigoHTML(productos) {
            // Comprobamos si el array de productos está vacío
            if (productos.length === 0) {
                return '<p>No hay productos disponibles.</p>';
            }
        
            // Inicializamos una cadena de HTML vacía
            let codigoHTML = '<ul>';
        
            // Iteramos a través de cada producto en el array
            productos.forEach(function (producto) {
              // Creamos un elemento <li> para cada producto
                codigoHTML += '<li>';
                codigoHTML += '<b>Producto:</b> ' + producto.product + '<br>';
                codigoHTML += '<b>Precio:</b> $' + producto.price.toFixed(2) + '<br>';
                codigoHTML += '<b>Cantidad:</b> ' + producto.amount + '<br>';
                codigoHTML += '<hr>'
                codigoHTML += '</li>';
            });
        
            // Cerramos la lista desordenada (<ul>)
            codigoHTML += '</ul>';
        
            return codigoHTML;
            }
        const html = '<h1>Ticket de compra:</h1><br>' + '<h3>Productos: </h3><br>' + generarCodigoHTML(productos) + '<h3>Precio total: $'+ price +'</h3>'+'<br>'
        try {
            const nodemail = await mail.send(email, "Ticket de compra", html)
            return ticket
        } catch (error) {
        }
    }
    else{
        return {error: "error con la operacion"};
    }
}