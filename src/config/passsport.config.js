import passport from "passport";
import githubStrategy from "passport-github2";
import userModel from "../daos/mongodb/models/Users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import local from "passport-local";
import CartManager from "../daos/mongodb/classes/cartManager.class.js";

const cartManager = new CartManager();
const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use('github', new githubStrategy({
        clientID: "Iv1.584b1e9ba2eb0879",
        clientSecret: "e406b22cc4cc659673b351ba999ece5bfe1f6061",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        let user = await userModel.findOne({ email: profile.profileUrl });
        if (!user) {
            let newUser = {
            email: profile.profileUrl ,
            age: profile.age ? profile.age : 0,
            role: "user",
            password: "",
            idCart: await cartManager.createCart()
            };
            console.log(profile._json);
            const result = await userModel.create(newUser);
            done(null, result);
        } 
        else {
            done(null, user);
        }
    }
))
passport.use('register', new LocalStrategy(
{passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
    
    const {first_name, last_name, email, age} = req.body;
    try{
        let user = await userModel.findOne({ email:username });
        if (user) {
            console.log("User already exists");
            return done (null,false)
        }
        //const newCart = await cartManager.createCart();
        //const newCart2 = newCart.toString();
        //console.log(newCart2)
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role: "user",
            idCart: await cartManager.createCart()
        }
        const result = await userModel.create(newUser);
        return done(null, result);
    }
    catch (error) {
        return done("Error al obtener el usuario: " + error);
    }
}
))
passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
    try{
        const user = await userModel.findOne({ email:username });
        if (!user) {
            console.log("User not found");
            return done (null,false)
        }
        if (!isValidPassword(user, password)) {
            console.log("Invalid password");
            return done (null,false)
        }
        return done(null, user);
    }
    catch (error) {
        return done("Error al obtener el usuario: " + error);
    }
}))
passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user)
})
}
