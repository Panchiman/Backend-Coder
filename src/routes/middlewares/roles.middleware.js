export const roleAdminCheck = (req, res, next) => {
    if (req.user.role == "admin"){
        next()
    }
    else{
        res.send({error: "You don't have access"})
    }
}

export const roleUserCheck = (req, res, next) => {
    if (req.session.user == "user"){
        next()
    }
    else{
        res.send({error: "You don't have access"})
    }
}