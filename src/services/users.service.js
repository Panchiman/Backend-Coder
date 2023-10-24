import UserManager from "../daos/mongodb/classes/userManager.class.js";

const userManager = new UserManager()

export const getUsersService = async () => {
    let users = await userManager.getUsers();
    return users}

export const getUserByIdService = async (Id) => {
    let user = await userManager.getUserById(Id);
    console.log(user)
    return user}

    export const deleteUserService = async (userId) => {
        userManager.deleteuser(userId);
    
    }
    export const updateUserService = async (userId, user) => {
        userManager.updateuser(userId, user);
    }