const express = require("express");
const app = express();
const server = require("http").Server(app);
const io= require("socket.io")(server);
const path = require("path");

const users = {};

io.on("connection", socket=>{
    socket.on("new-user", name=>{
        console.log(`${name} Connected`);
        users[socket.id] = name;
        socket.broadcast.emit("user-connected", name);
    })
    socket.on("send", msg=>{
        socket.broadcast.emit("chat-msg", {msg: msg, name: users[socket.id]})
    })
})

app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
server.listen(port);