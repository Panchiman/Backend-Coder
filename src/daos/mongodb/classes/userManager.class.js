
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
}