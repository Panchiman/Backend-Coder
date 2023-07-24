const botonDesconectar = document.getElementById('botonDesconectar');

botonDesconectar.addEventListener('click', () => {
    console.log("Desconectando")
    fetch(`http://localhost:8080/api/sessions/logout`,{
        method:'POST',
    })
});