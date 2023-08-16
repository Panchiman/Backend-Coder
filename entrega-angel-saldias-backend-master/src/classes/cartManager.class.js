import fs from "fs";
import { v4 as uuidv4 } from "uuid";


export default class CartManager {
    constructor(carts = []) {
        this.carts = carts;
        this.path = 'src/data/cart.json';
        }
    
    checkFile() {
        if (fs.existsSync(this.path)) {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(fileContent);
        }
        else {
            fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf-8');
        }
    }
    createCart (){
        this.checkFile()
        this.carts.push({id: uuidv4(), products: [],});
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    };
    getCarts (){
        this.checkFile()
        return this.carts;
    }

    getCartById = (id) => {
        this.checkFile()
        const cart = this.carts.find((cart) => cart.id === id);
        if (!cart) {
            console.error("Cart not found");
        }
        else{
            console.log(`Cart found: ${JSON.stringify(cart, null, 2)}`)
            return cart;
        }
    }
    
    addToCart = async (idCart, idProduct) => {
        this.checkFile()
        const cart = await this.getCartById(idCart);
        const productIndex = cart.products.findIndex(p => p.product === idProduct);
        if (!cart) {
            console.error("Cart not found");
        }
        else{
            if (productIndex === -1) {
                console.log("no esta en el carrito")
                cart.products.push({product: idProduct, quantity: 1});
            }
            else {
                console.log("esta en el carrito")
                cart.products[productIndex].quantity++;
            }
            this.carts.splice(this.carts.findIndex((cart) => cart.id === idCart), 1, cart);
            fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
        }
    }

}