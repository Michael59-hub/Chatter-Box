const socket = io("http://localhost:3000");

const form = document.getElementById("input");
const messageInput = document.getElementById("msg");
const textArea = document.getElementById("text-area");
const Name = prompt("What is your name");

const join = document.createElement("div");
join.setAttribute("class", "join");
join.innerText = `You joined the chat`;
textArea.append(join);

socket.emit("new-user", Name);

socket.on("chat-message", text=>{
    console.log(text);
});

socket.on("user-connected", name=>{
    const join = document.createElement("div");
    join.setAttribute("class", "join");
    join.innerText = `${name} joined the chat`;
    textArea.append(join);
})

form.addEventListener("submit", e=>{
    e.preventDefault();
    const message = messageInput.value;
    const text = document.createElement("p");
    text.setAttribute("class", "send");
    text.innerText = message;
    textArea.append(text);
    socket.emit("send", message);
    messageInput.value = "";
})

function appendMessage(msg, name){
    const text = document.createElement("p");
    text.setAttribute("class", "receive");
    text.innerText = msg;
    textArea.append(text);
}

socket.on("chat-msg", mssg=>{
    appendMessage(mssg.msg, mssg.name);
})