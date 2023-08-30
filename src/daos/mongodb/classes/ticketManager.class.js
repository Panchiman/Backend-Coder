import mongoose from "mongoose";
import config from "../../../config/config.js";
import ticketModel from "../models/ticket.model.js";

export default class TicketManager {
    connection = mongoose.connect(
        config.mongoUrl
    )
    async addTicket(ticket) {
        try {
            let result = await ticketModel.create(ticket);
            return result;
            } 
            catch (error) {
            return error;
        }
    }
}