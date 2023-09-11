import dotenv from 'dotenv';

dotenv.config();

export default {
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    adminCart: process.env.ADMIN_CART,
    mongoSecret: process.env.MONGO_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_SECRET,
    ENVIRONMENT: process.env.ENVIRONMENT,
    nodemailUser: process.env.NODEMAIL_USER,
    nodemailPass: process.env.NODEMAIL_PASS,
}