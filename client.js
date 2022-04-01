const socket = io("http://localhost:3000");

const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const form = document.getElementById("form-container");

const username = prompt("Please write your name");
socket.emit("new-user", username);

socket.on("get-message", (data) => {
  displayMessage(`${data.user}: ${data.message}`);
});

socket.on("user-connected", (data) => {
  displayMessage(`${data}: connected`);
});

socket.on("user-disconnected", (data) => {
  displayMessage(`${data}: disconnected`);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("send-message", messageInput.value);
  displayMessage(`You: ${messageInput.value}`);
});

function displayMessage(message) {
  const p = document.createElement("p");
  p.innerText = message;
  messageContainer.append(p);
}
