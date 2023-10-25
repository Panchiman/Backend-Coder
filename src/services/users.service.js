import Mail from "../config/nodemailer.config.js";
import UserManager from "../daos/mongodb/classes/userManager.class.js";

const userManager = new UserManager()
const mail = new Mail();

export const getUsersService = async () => {
    let users = await userManager.getUsers();
    return users}

export const getUserByIdService = async (Id) => {
    let user = await userManager.getUserById(Id);
    console.log(user)
    return user}

    export const getUserByEmailService = async (email) => {
        let user = await userManager.getUserByEmail(email);
        console.log(user)
        return user}

    export const deleteUserService = async (userId) => {
        await userManager.deleteUser(userId);
    
    }
    export const updateUserService = async (userId, user) => {
        const Finaluser = await userManager.updateUser(userId, user);
        console.log(Finaluser)
    }

    export const updateUserServiceWithMail = async (email, user) => {
        const Finaluser = await userManager.updateUserWithMail(email, user);
        console.log(Finaluser)
    }

    export const deleteUnusedUsers = async () => {
        const actualDate = new Date()
        const deleteDate = new Date()
        deleteDate.setDate(actualDate.getDate() - 2);
        console.log(deleteDate)
        const users = await userManager.getUsers()
        for (const usuario of users){
            if (usuario.lastSession < deleteDate){
                const html = "<h1>Su usuario fue eliminado de nuestra tienda por inactividad </h1><br><p>Su ultima conexion fue: "+ usuario.lastSession +".</p><br> Disculpe las molestias</p>"
                const nodemail = await mail.send(usuario.email, "Su usuario fue eliminado de nuestra tienda", html)
                await userManager.deleteUser(usuario._id);
            }
        }
    }