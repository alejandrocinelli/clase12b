//const socket = io();

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("message");
const emailInput = document.getElementById("email");
const chatPool = document.getElementById("messageForm");

const sendMsg = (msgInfo) => {
    console.log("enviando mensaje");
  socket.emit("Client-message", msgInfo);
}

const renderChat = (chat) => { 
             
    const html = chat.map ((msg) => {
        return (`
        
        <p> <span>${msg.email} </span><span> ${msg.data}</span> <span> ${msg.message}</span>  </p>
                
        `);

    });
    chatPool.innerHTML = html.join("");
}

const submitHandlerChat = (e) => {
    e.preventDefault();
    const msgInfo = {
        email: emailInput.value,
        message: messageInput.value,
        data : new Date().toLocaleString()
    };
    sendMsg(msgInfo);
    chatForm.reset();
}

chatForm.addEventListener("submit", submitHandlerChat);

socket.on("server:message",renderChat)
