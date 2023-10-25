function addToCartButton (idCart, idProduct){
    fetch(`http://localhost:8080/carts/${idCart}/products/${idProduct}`,{
        method:'POST',
    })
};

const botonAtras = document.getElementById('botonAtras');

// function botonRemoveFromCart(idCart, idProduct){
//     console.log("carrito"+idCart+"producto"+idProduct)
//     fetch(`http://localhost:8080/carts/${idCart}/products/${idProduct}`,{
//         method:'DELETE',
//     })
//     Swal.fire({
//         position: 'top-end',
//         icon: 'warning',
//         title: 'Producto removido del carrito',
//         showConfirmButton: false,
//         timer: 1000
//     })
// }

function botonRemoveFromCart(idCart, idProduct){
    console.log("eliminado product:" + idProduct + "de carrito" + idCart)
    fetch(`http://localhost:8080/carts/${idCart}/products/${idProduct}`,{
        method:'DELETE',
    })
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Usuario eliminado',
        showConfirmButton: false,
        timer: 1500
    })
}


function finalizarcompra(idCart){
    console.log("compra finalizada del carrito: " + idCart)
    fetch(`http://localhost:8080/carts/${idCart}/purchase`,{
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        if (response.ok) {
            console.log('Usuario actualizado con éxito');
        } else {
            console.error('Error al actualizar el usuario');
        }
        })
        .then(() => {
            window.location.replace("http://localhost:8080/products")
            })
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Compra realizada, recibiste un mail con toda la informacion de la misma',
        showConfirmButton: false,
        timer: 4000
    })
}