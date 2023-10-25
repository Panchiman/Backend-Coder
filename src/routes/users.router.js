import { Router } from "express";
import { deleteUserService, getUserByIdService, getUsersService, updateUserService } from "../services/users.service.js";
const router = Router();


router.get("/", async (req, res) => {
    const users = await getUsersService()
    res.render('allusers', {users})
})

router.get("/:uid", async (req, res) => {
    const userId = req.params.uid
    let userPermission = req.session.user.role;
    if (userPermission != "admin"){
        return res.redirect('/api/users')
    }
    console.log(userId)
    const user = await getUserByIdService(userId)
    res.render('user', {user})
})

router.put("/:uid", (req, res) => {
    console.log("por aca")
    if(req.session.user.role == "admin"){
        console.log("no")
        const userId = req.params.uid;
        const user = req.body;
        console.log(userId)
        console.log(user)
        updateUserService(userId, user);
        res.send({ status: "success" });
    }
    else{
        console.log("si")
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