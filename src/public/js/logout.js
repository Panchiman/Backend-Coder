const botonDesconectar = document.getElementById('botonDesconectar');

botonDesconectar.addEventListener('click', () => {
    console.log("Desconectando")
    fetch(`/api/sessions/logout`,{
        method:'POST',
    })
});