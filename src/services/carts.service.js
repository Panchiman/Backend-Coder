
import CartManager from "../daos/mongodb/classes/cartManager.class.js";
import TicketManager from "../daos/mongodb/classes/ticketManager.class.js";
import UserManager from "../daos/mongodb/classes/userManager.class.js";
import { substractToProductStock } from "./products.service.js";
import TicketDTO from "./DTO/ticket.service.js";

const cartManager = new CartManager();
const userManager = new UserManager();
const ticketManager = new TicketManager();

export const getCartService = async (user, id, bole) => {
    const cart = await cartManager.getCartById(id,bole);
    if (!cart) {
        throw new Error ("Cart not found");
    }
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
    console.log(carrito)
    return carritoandUser;
}

export const deleteFromCartService = async (cartId, productId) => {
    const cart = await cartManager.deleteFromCart(cartId, productId);
    if (!cart) {
        throw new Error ("Cart not found");
    }
}

export const getCartsService = async () => {
    const carts = cartManager.getCarts();
    return carts;
}

export const addToCartService = async (cartId, productId) => {
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
    console.log("user")
    console.log(user)
    console.log("email")
    console.log(email)
    
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
        return ticket
    }
    else{
        return {error: "error con la operacion"};
    }
}