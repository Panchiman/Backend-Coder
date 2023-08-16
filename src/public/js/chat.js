const socket = io();
let user;
let user_email

const chatbox = document.getElementById("chatbox");
const messageLogs = document.getElementById("messageLogs");

chatbox.addEventListener("keyup", async (evt) => {
    await fetch('/api/sessions/current')
    .then(result=>{ return result.json()
    })
    .then(data=>{ user = data.first_name + " " + data.last_name
    user_email = data.email
    })

    if (evt.key === "Enter") {
      socket.emit("message", { user: user, message: chatbox.value });
      
    const message = {
        user:user,
        email:user_email,
        message:chatbox.value,
    }
    chatbox.value == "";
    fetch('/chat',{
        method:'POST',
        body:JSON.stringify(message),
        headers:{
            'Content-Type':'application/json'
        }
    })
    }
  });
  
  socket.on("imprimir", (data) => {
    let mensajes = "";
    data.forEach((msj) => {
      mensajes += `${msj.user} escribio: ${msj.message} <br/>`;
    });
    messageLogs.innerHTML = mensajes;
  });