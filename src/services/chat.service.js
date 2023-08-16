import ChatDTO from './DTO/message.service.js';
import ChatManager from '../daos/mongodb/classes/chatManager.class.js';

const chatManager = new ChatManager();

export const addMessageService = async (user, email, message) => {
    const messageObject = new ChatDTO (user, email, message)
    if (!messageObject){
        return {error: "Error"}
    }
    else{
        chatManager.addMessage(messageObject)
    }
}

export const getChatsService = async () => {
    const chats = chatManager.getChats()
    if (chats){
        return chats
    }
}