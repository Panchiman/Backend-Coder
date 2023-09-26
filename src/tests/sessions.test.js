import chai from 'chai';
import supertest from 'supertest';
import userModel from '../daos/mongodb/models/Users.model.js';

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe('Sessions  API', () => {
    // Test para POST /api/sessions/register
    // describe('POST /api/sessions/register', async () => {
    //     before(async () => {
    //         // Reinicia y puebla la base de datos de prueba antes de cada prueba
            
    //     })
    //     it('debe crear un nuevo usuario', async () => {
    //     const newUser = {
    //         "first_name":"Juan",
    //         "last_name":"Perez",
    //         "email":"juanperez1@gmail.com",
    //         "age": 33,
    //         "password": "123",
    //     };
    //     const {_body } = await requester
    //         .post('/api/sessions/register')
    //         .send(newUser)

    //         expect(_body.status).to.be.ok;
    //     }).timeout(10000);
    // });
    describe('POST /api/sessions/login', () => {
        it('debe logear el usuario', async () => {
        const User = {
            "email":"papaya@gmail.com",
            "password": "123",
        };
        const {_body } = await requester
            .post('/api/sessions/login')
            .send(User)

            expect(_body.status).to.be.ok;
        });
    });
    describe('POST /api/sessions/login', () => {
        it('debe dar error logear un usuario inexistente', async () => {
        const User = {
            "email":"papaya1@gmail.com",
            "password": "123",
        };
        const {_body } = await requester
            .post('/api/sessions/login')
            .send(User)

            expect(_body.status).to.not.be.ok;
        });
    });

});