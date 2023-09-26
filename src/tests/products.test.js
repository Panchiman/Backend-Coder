import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest("http://localhost:8080");


describe('Productos API', () => {

    // Test para GET /products/:pid
    // describe('GET /products/:pid', () => {
    //     it('debe devolver un producto por ID', async () => {
    //         const { statusCode, ok, _body } = await requester
    //         .get('/products/651240e7fc5264d0b4754b57') 

    //     expect(_body).to.be.an('object');
    //     });
    // });


    // Test para POST /products
    // describe('POST /products', () => {
    //     it('debe crear un nuevo producto', async () => {
    //     const newProduct = {
    //         "title": 'Perro',
    //         "description": "doggo", 
    //         "price": 222, 
    //         "code": "1223212355", 
    //         "stock": 3, 
    //         "category": "mamifero", 
    //         "status": true
    //     };

    //     const { statusCode, ok, _body } = await requester
    //         .post('/products')
    //         .send(newProduct)

    //         expect(_body.status).to.be.ok;
    //     });
    // });
});