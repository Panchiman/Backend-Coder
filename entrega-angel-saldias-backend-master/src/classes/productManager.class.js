import fs from 'fs';
import {v4 as uuidv4} from 'uuid';


export default class ProductManager {
    constructor(products = []) {
        this.products = products;
        this.path = 'src/data/products.json';
        // En la consigna no me quedo claro si esto era lo que pedian o pedian que cuando se inicializara la clase estuviera como parametro el path para poner en la creacion, espero que sea esto lo que pedian, sino seria muy facil cambiarlo.
        }
    
    checkFile() {
        if (fs.existsSync(this.path)) {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(fileContent);
        }
        else {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');

        }
    } 

    addProduct(product) {
// Valida que todos los campos esten y si coincide el codigo con uno ya existente tira un console.error con el error pertinente, originalmente iba a usar throw new Error pero detenia la ejecucion del codigo en su totalidad y supuse que no era lo que se queria
// Puse los errores en ingles porque como en una parte de la consigna pedia devolver un "not found" supuse que la idea era que el codigo estuviera en ingles    
    
        this.checkFile();
        
        if (!product.title) {
                console.error("The title is required");
            }
            else if (!product.description) {
                console.error("Description is required");
            }
            else if (!product.price) {
                console.error("Price is required");
            }
            else if (!product.category) {
                console.error("The product category is required");
            }
            else if (!product.code) {
                console.error("The product code is required");
            }
            else if (!product.stock) {
                console.error("The product stock is required");
            }
            else if (this.products.some(p => p.code === product.code)) {
                console.error("A product with the same code already exists");
            }
            else{
                this.products.push({
                    id: uuidv4(),
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    thumbnail: product.thumbnail ?? "Sin imagen",
                    status: product.status ?? true,
                    //como decia que el status predeterminado era true, no lo hice un campo obligatorio, sino no tendria sentido ponerle un valor por defecto.
                    code: product.code,
                    stock: product.stock,
                });
                fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
            }
    }
getProducts(limit){
    this.checkFile();
    const numericLimit = parseInt(limit);
    if (limit){
        return this.products.slice(0,numericLimit);
    }
    else{
        console.log(this.products)
        return this.products;
    }
}
getProductById(id) {
    this.checkFile();
    const product = this.products.find(p => p.id === id);
    if (!product) {
        console.error("Not found");
        return 'Product not found';
    }
    else {
        console.log(`Product found: ${JSON.stringify(product, null, '/t')}`)
        return product;
    }
    }

deleteProduct(id) {
    this.checkFile();
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex == -1) {
        console.error("The product you want to delete does not exist");
    }
    else {
        this.products.splice(productIndex, 1);
        console.log(`Product deleted`)
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }
}
updateProduct(id,product) {
    this.checkFile();
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex == -1) {
        console.error("The product you want to update does not exist");
    }
    else {
        this.products[productIndex] = {
            id: id,
            title: product.title ?? this.products[productIndex].title,
            description: product.description ?? this.products[productIndex].description,
            price: product.price ?? this.products[productIndex].price,
            thumbnail: product.thumbnail ?? this.products[productIndex].thumbnail,
            code: product.code ?? this.products[productIndex].code,
            stock: product.stock ?? this.products[productIndex].stock,
        }
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
        console.log("Product updated")
    }
}
}
