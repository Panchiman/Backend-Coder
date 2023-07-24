const socket = io();
const productos = document.getElementById("productos")

console.log("Conectado");


function convertirAHTML(productos) {
    let html = '';

    productos.forEach((producto) => {
        html += '<div class="producto">';
        html += '<h2>' + producto.title + '</h2>';
        html += '<p>' + producto.description + '</p>';
        html += '<p>Precio: ' + producto.price + '</p>';
        html += '<p>Categoría: ' + producto.category + '</p>';
        html += '<img src="' + producto.thumbnail + '" alt="Imagen del producto">';
        html += '<p>Stock disponible: ' + producto.stock + '</p>';
        html += '</div>';
    });

    return html;
}

socket.on('products', (products) => {
    convertirAHTML(products)
    productos.innerHTML = convertirAHTML(products);
})


