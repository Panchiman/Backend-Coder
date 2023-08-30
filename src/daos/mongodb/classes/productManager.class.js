import fs from 'fs';
import mongoose from 'mongoose';
import { productsModel } from '../models/product.models.js';
import config from "../../../config/config.js";


export default class ProductManager {
    connection = mongoose.connect(
        config.mongoUrl
    );
        async addProduct(product) {
            try {
                let result = await productsModel.create(product);
                return result;
                } 
                catch (error) {
                return error;
            }
        }

    async getProductsArray() {

    }
async getProducts(limit = 10, page = 1, sort = 0, filter = null, filterVal = null){
    try{
        let filterOptions = {};
        if (filter != "" && filterVal != "" && filter != "undefined" && filterVal != "undefined") {
            filterOptions = { [filter]: filterVal };
        }
        //Esto lo hice para que no me haga sort cuando no le paso nada
        if (sort == 1 || sort == -1) {
            let result = await productsModel.paginate(filterOptions, {limit: limit, page: page, sort: { price: sort },lean:true});
            return result;
        }
        else{
            let result = await productsModel.paginate(filterOptions, {limit: limit, page: page,lean:true});
            return result;
        }
    }
    catch (error) {
        return error;
    }
}
    async getProductById(id) {
        try {
            let result = await productsModel.findOne({ _id: id }).lean();
            return result;
        }
        catch (error) {
            return error;
        }
    }

    async deleteProduct(id) {
        try {
            let result = productsModel.deleteOne(
                { _id: id },
                { $set: updatedProduct }
                );
            return result;
        } 
        catch (error) {
            return error;
        }
    }
    async updateProduct(id, updatedProduct) {
        try{
            let result = await productsModel.updateOne(
            { _id: id },
            { $set: updatedProduct }
            );
            return result;
        }
        catch (error) {
            return error;
        }
    }
}
