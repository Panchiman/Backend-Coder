import express from 'express';
import routerProducts from './routes/products.router.js';
import routerCart from './routes/carts.router.js';
import routerChat from './routes/chat.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import ProductManager from './daos/mongodb/classes/productManager.class.js';
import { Server } from "socket.io";
import mongoose from 'mongoose';
import { productsModel } from './daos/mongodb/models/product.models.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userModel from './daos/mongodb/models/Users.model.js';
import routerAuth from './routes/auth.router.js';
import routerSessions from './routes/sessions.router.js';
import routerLogger from './routes/logger.router.js';
import routerMockingproducts from './routes/mockingproducts.router.js';
import passport from 'passport';
import {initializePassport} from './config/passsport.config.js';
import config from './config/config.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { addLogger } from './config/logger.config.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from "swagger-ui-express"

const app = express();
app.use(addLogger)


app.use(session({
    store: new MongoStore({
    mongoUrl: config.mongoUrl,
    }),
    secret: config.mongoSecret,
    resave: true,
    saveUninitialized: false,
}))

initializePassport();

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const swaggerOptions = {
  definition:{
    openapi:'3.0.1',
    info:{
      title:"Proyecto backend Angel Saldias",
      description:"Ecommerse para el curso de Backend en coderhouse"
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/products', routerProducts)
app.use('/carts/', routerCart)
app.use('/chat', routerChat)
app.use('/', routerAuth)
app.use('/mockingproducts', routerMockingproducts)
app.use('/api/sessions', routerSessions)
app.use('/logger/', routerLogger)
app.use(errorMiddleware)




const expressServer = app.listen(config.port, () => console.log("Listening on port " + config.port + "..."));

const socketServer = new Server(expressServer);

const mensajes = [];
socketServer.on("connection", (socket) => {
  console.log("connected " + socket.id);
  socket.on("message", (data) => {
    console.log(data)
    mensajes.push(data);
    socketServer.emit("imprimir", mensajes);
  });

});


app.use(function (req, res, next) {
    req.socketServer = socketServer;
    next();
})





//app.use('/realtimeproducts/', routerRealTimeProducts)
