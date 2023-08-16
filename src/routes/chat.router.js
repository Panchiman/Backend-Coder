import { Router } from "express";

const router = Router();


router.get('/', (req, res) => {
    if (!req.isAuthenticated()){
        res.redirect('/')
    }
    res.render('chat')
})

export default router;