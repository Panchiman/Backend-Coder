const socket = io();
let user;

const chatbox = document.getElementById("chatbox");
const messageLogs = document.getElementById("messageLogs");

chatbox.addEventListener("keyup", async (evt) => {
    await fetch('/api/sessions/current')
    .then(result=>{ return result.json()
    })
    .then(data=>{ user = data.first_name + " " + data.last_name
    })

    if (evt.key === "Enter") {
      socket.emit("message", { user: user, message: chatbox.value });
      chatbox.value == "";
    }
  });
  
  socket.on("imprimir", (data) => {
    let mensajes = "";
    data.forEach((msj) => {
      mensajes += `${msj.user} escribio: ${msj.message} <br/>`;
    });
    messageLogs.innerHTML = mensajes;
  });