import mongoose from 'mongoose'

const collection = 'tickets'

const schema = new mongoose.Schema({
    code:String,
    purchase_datetime:Date,
    products:Array,
    amount:Number,
    purchaser:String,
})

const ticketModel = mongoose.model(collection, schema)
export default ticketModel