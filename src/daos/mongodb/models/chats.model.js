import mongoose from 'mongoose'

const collection = 'chats'

const schema = new mongoose.Schema({
    user: String,
    message_datetime: Date,
    email: String,
    message: String,
})

const chatModel = mongoose.model(collection, schema)
export default chatModel