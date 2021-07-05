const io = require('socket.io')(3000)

const users = {}

io.on("connection", socket => {
    //console.log("new User")
    //console.log(socket.id)
    
    socket.on("send-chat-message", message => {
        console.log(socket.id + " sent message " + message)
        socket.broadcast.emit("chat-message", {message: message, name: users[socket.id]})
    })

    socket.on("new-user", name => {
        //console.log(name)
        users[socket.id] = name
        socket.broadcast.emit("user-connected", name)

    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id])
        delete users[socket.id]
    })
})
