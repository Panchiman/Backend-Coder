function addToCartButton (idCart, idProduct){
    fetch(`http://localhost:8080/carts/${idCart}/products/${idProduct}`,{
        method:'POST',
    })
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
    })
};

const botonAtras = document.getElementById('botonAtras');

function botonRemoveFromCart(idCart, idProduct){
    console.log("carrito"+idCart+"producto"+idProduct)
    fetch(`http://localhost:8080/carts/${idCart}/products/${idProduct}`,{
        method:'DELETE',
    })
    Swal.fire({
        position: 'top-end',
        icon: 'delete',
        title: 'Producto removido del carrito',
        showConfirmButton: false,
        timer: 1500
    })
}