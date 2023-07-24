const form = document.getElementById('registerForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    console.log('register')
    const data = new FormData(form);
    const obj = {};
    console.log('register2')
    data.forEach((value,key)=>obj[key]=value);
    try{
    fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>console.log(json));
    }
    catch (error) {
        console.error(error);
    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario registrado correctamente',
        showConfirmButton: false,
        timer: 1500
    })
    setTimeout(() => {
        window.location.replace('http://localhost:8080/');
    }, "1500");
})