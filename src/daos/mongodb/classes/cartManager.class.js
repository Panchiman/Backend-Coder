import mongoose from "mongoose";
import { cartModel } from "../models/carts.model.js";
import ProductManager from "./productManager.class.js";
import config from "../../../config/config.js";


export default class CartManager {
    connection = mongoose.connect(
        config.mongoUrl
    );
    productManager = new ProductManager();

    async createCart() {
        try{
        const result = await cartModel.create({ products: [] });
        console.log(result._id)
        return result._id;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    
    }
    async getCarts (){
        try{
            const result = await cartModel.find().lean();
            console.log(result)
            return result;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }

    async getCartById (idCart, len = false) {
        try{
            if (len){
                const result1 = await cartModel
                .findOne({ _id: idCart }).lean()
                .populate("products.product");
                return result1;
            }
            else{
                const result2 = await cartModel
                .findOne({ _id: idCart })
                .populate("products.product");
                return result2;
            }
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    
    async addToCart (idCart, idProduct){
        try {
            const cart = await this.getCartById(idCart);
            const index =  cart.products.findIndex((item) => item.product._id == idProduct)
            const producto = await this.productManager.getProductById(idProduct);
            console.log(producto)
            if (index == -1){
                cart.products.push({ product: producto, amount: 1 });
            }
            else{
                cart.products.splice(index,1,{ product: producto, amount: cart.products[index].amount + 1 })
            }
            console.log(index)
            await cart.save();
            console.log("añadido al carrito")
            return;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    async deleteFromCart(idCart, idProduct) {
        try {
            const cart = await this.getCartById(idCart);
            console.log(cart)
            cart.products.pull(idProduct);
            await cart.save();
            return true;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async clearCart(idCart) {
        try{
            const cart = await this.getCartById(idCart);
            console.log(cart)
            cart.products = [];
            await cart.save();
            return;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async updateCart(idCart, products) {
        try {
            const cart = await this.getCartById(idCart);
            cart.products = [];
            await cart.save();
            let productsArray = products.products;
            productsArray.forEach(productId => this.addToCart(idCart, productId)) 
            return;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async updateProductQuantity(idCart, idProduct, products) {
        try {
            const cart = await this.getCartById(idCart);
            console.log(cart.products.id())
            //const findProduct = result.products.find(product => product.id == idProduct);
            //console.log(findProduct)
            return;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}