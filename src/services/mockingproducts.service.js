import { generateProduct } from "../utils.js"
import { addProductService } from "./products.service.js"

export const generateProducts = async (productsNumber) =>{
    let products = []
    if (!productsNumber) {
        productsNumber = 1
    }
    for (let i = 0; i < productsNumber; i++){
        let product = generateProduct()
        //await addProductService(product)
        products.push(product)
    }
    return products
}