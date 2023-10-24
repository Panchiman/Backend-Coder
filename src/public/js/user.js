
function botonRemoveFromUsers(userId){
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