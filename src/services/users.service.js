import UserManager from "../daos/mongodb/classes/userManager.class.js";

const userManager = new UserManager()

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