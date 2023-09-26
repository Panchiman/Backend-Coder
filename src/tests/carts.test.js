import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest("http://localhost:8080");


describe('Carts API', () => {
  // Test para GET /carts
    describe('GET /carts', () => {
        it('debe devolver todos los carritos y este debe ser un array', async () => {
            const {_body } = await requester
            .get('/carts')
            expect(_body.status).to.be.ok;
            expect(Array.isArray(_body.payload)).to.be.equal(true);
        });
    });
  // Test para POST /carts
    describe('Post /carts', () => {
        it('debe devolver ok cuando se intenta crear un nuevo carrito', async () => {
            const {_body } = await requester
            .get('/carts')
            expect(_body.status).to.be.ok;
        });
    });
// Test para post /carts/cid/products/pid
describe('Post /carts/cid/products/pid', () => {
    it('debe devolver ok cuando se intenta crear un nuevo carrito', async () => {
        const {_body } = await requester
        .post('/carts/65123a9714080369cb40785a/products/651240e7fc5264d0b4754b57')
        expect(_body.status).to.be.ok;
    });
});

});