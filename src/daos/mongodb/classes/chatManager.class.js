import mongoose from "mongoose";
import config from "../../../config/config.js";
import chatModel from "../models/chats.model.js";

export default class ChatManager {
    connection = mongoose.connect(
        config.mongoUrl
    )
    async addMessage(mesateDTO) {
        try {
            let result = await chatModel.create(mesateDTO);
            return result;
            } 
            catch (error) {
            return error;
        }
    }
    async getChats(){
        try{
            const result = await chatModel.find().lean();
            return result;
        }
        catch (error) {
            return null;
        }
    }
}