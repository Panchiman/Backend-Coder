import { Router } from "express";
import { getUserByIdService, getUsersService } from "../services/users.service.js";
const router = Router();


router.get("/", async (req, res) => {
    const users = await getUsersService()
    res.render('allusers', {users})
})

router.get("/:uid", async (req, res) => {
    const userId = req.params.uid
    console.log(userId)
    const user = await getUserByIdService(userId)
    res.render('user', {user})
})

router.put("/:pid", (req, res) => {
    if(req.session.user.role == "admin"){
        const userId = req.params.pid;
        const user = req.body;
        updateUserService(userId, user);
        res.send({ status: "success" });
    }
    else{
        res.send({error: "acceso denegado"})
    }
})

router.delete("/:uid", (req, res) => {
    if(req.session.user.role == "admin"){
        const userId = req.params.uid;
        deleteUserService(userId);
        res.send({ status: "success" });
    }
    else{
        res.send({error: "acceso denegado"})
    }
})

export default router