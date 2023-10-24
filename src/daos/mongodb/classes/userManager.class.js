
import mongoose from "mongoose";
import config from "../../../config/config.js";
import userModel from "../models/Users.model.js";

export default class UserManager {
    connection = mongoose.connect(
        config.mongoUrl
    )
    async findUserByCart(cartId){
        let result = await userModel.findOne({ idCart: cartId })
        if (!result){
            return {error: "No user found with that cart"}
        }
        else{
            return result
        }
    }

    async getUsers (){
        try{
            const result = await userModel.find().lean();
            return result;
        }
        catch (error) {
            
            return null;
        }
    }

    async getUserById(id) {
        try {
            let result = await userModel.findOne({ _id: id }).lean();
            return result;
        }
        catch (error) {
            return error;
        }
    }
    async updateUser(id, updatedUser) {
        try {
            let result = await userModel.updateOne(
                { _id: id },
                { $set: updatedUser }
                );
            return result;
        } 
        catch (error) {
            return error;
        }
    }
    async deleteUser(id) {
        try {
            let result = await userModel.deleteOne(
                { _id: id },
                { $set: updatedUser }
                );
            return result;
        } 
        catch (error) {
            return error;
        }
    }
}