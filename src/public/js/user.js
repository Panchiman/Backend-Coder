
function eliminarUsuario(userId){
    console.log("eliminado usuario:" + userId)
    fetch(`/api/users/${userId}`,{
        method:'DELETE',
    })
    Swal.fire({
        position: 'top-end',
        icon: 'delete',
        title: 'Usuario eliminado',
        showConfirmButton: false,
        timer: 1500
    })
}


// async function eliminarUsuario(userId){
//     console.log(userId)
//     Swal.fire({
//         title: 'Cambiar rol del usuario',
//         html: `<input type="text" id="role" class="swal2-input" placeholder="User rol">`,
//         confirmButtonText: 'Confirm',
//         showCancelButton: true,
//         focusConfirm: false,
//         preConfirm: () => {
//             const role = Swal.getPopup().querySelector('#role').value
//             if (!role) {
//             Swal.showValidationMessage(`Por favor pon el rol`)
//             }
//             return { role: role }
//         }
//         }).then((result) => {
//             console.log(result)
//             fetch(`http://localhost:8080/api/users/${userId}`,{
//                 method:'PUT',
//                 body:JSON.stringify(result),
//                 headers:{
//                     'Content-Type':'application/json'
//                 }
//             })
//     })
// }

async function cambiarUsuario(userId){
const { value: result } = await Swal.fire({
  title: 'Enter your IP address',
  input: 'text',
  inputLabel: 'Your IP address',
  showCancelButton: true,
  inputValidator: (value) => {
    if (!value) {
      return 'You need to write something!'
    }
  }
})

if (result) {
    console.log(userId)
    fetch(`/api/users/${userId}`,{
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({role: result})
    })
    .then((response) => {
    if (response.ok) {
        console.log('Usuario actualizado con éxito');
    } else {
        console.error('Error al actualizar el usuario');
    }
    })
    .catch((error) => {
    console.error('Se produjo un error al realizar la solicitud:', error);
    });
}}
