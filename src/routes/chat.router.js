import { Router } from "express";
import { addMessageService, getChatsService } from "../services/chat.service.js";

const router = Router();


router.get('/', (req, res) => {
    if (!req.isAuthenticated()){
        res.redirect('/')
    }
    res.render('chat')
})

router.post('/', (req, res) => {
    if (!req.isAuthenticated()){
        res.redirect('/')
    }
    const {user, email, message} = req.body;
    addMessageService(user, email, message)
})

router.get('/logs', async (req, res) => {
    if (!req.isAuthenticated()){
        res.redirect('/')
    }
    const chats = await getChatsService()
    req.logger.debug(JSON.stringify(chats))
    res.render('chatlog', {chats})
})

export default router;