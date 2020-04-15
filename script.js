const socket = io("http://localhost:3000")
const messageForm = document.getElementById("send-container")
const nameForm = document.getElementById("name-container")
const messageInput = document.getElementById("message-input")
const nameInput = document.getElementById("name-input")
const messageContainer = document.getElementById("message-container")
/*const name = prompt("What is your Name?")
const name = "Alex"
console.log(name + " of prompt")

appendMessage("You joined")
socket.emit("new-user", name)
*/

appendMessage("You joined")




socket.on("chat-message", data => {
    const name = data.name
    const message = data.message
    appendMessage(name + ": " + message)
})

socket.on("user-connected", name => {
    appendMessage(name + " connected")
    console.log(name + " connected")
})

socket.on("user-disconnected", name => {
    appendMessage(name + " disconnected")
    
})

messageForm.addEventListener("submit", event => {
    event.preventDefault()
    const message = messageInput.value
    appendMessage("You: " + message)
    socket.emit("send-chat-message", message)
    messageInput.value=""
    
})

nameForm.addEventListener("submit", event => {
    event.preventDefault()
    const name = nameInput.value
    socket.emit("new-user", name)
    
})

function appendMessage(message) {
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageContainer.append(messageElement)
}