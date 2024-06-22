//"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//// Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;

//const canvas = document.getElementById("whiteboard"); // fetch the canvas
//const context = canvas.getContext("2d"); // the context for drawing on the whiteboard

//connection.on("ReceiveMessage", function (user, message) {
//    var li = document.createElement("li");
//    document.getElementById("messagesList").appendChild(li);
//    li.textContent = `${user}: ${message}`;
//    messagesList.prepend(li);
//    document.getElementById('messageInput').value = '';
//});

//async function startConnection() {
//    try {
//        await connection.start();
//        console.log("SignalR Connected.");
//        document.getElementById("sendButton").disabled = false;
//    } catch (err) {
//        console.error("Error establishing connection:", err.toString());
//        setTimeout(startConnection, 5000); // Retry connection after 5 seconds
//    }
//}

//connection.onclose(async () => {
//    console.log("Connection closed. Attempting to reconnect...");
//    document.getElementById("sendButton").disabled = true;
//    await startConnection();
//});

//startConnection();

//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;

//    if (connection.state === signalR.HubConnectionState.Connected) {
//        connection.invoke("SendMessage", user, message).catch(function (err) {
//            console.error("SignalR Error: ", err.toString());
//            alert("An error occurred while sending the message: " + err.toString());
//        });
//    } else {
//        alert("Cannot send message. Connection is not in the 'Connected' state.");
//    }

//    event.preventDefault();
//});

//let isDrawing = false;
//canvas.addEventListener("mousedown", startDrawing);
//canvas.addEventListener("mousemove", mouseDraw);
//canvas.addEventListener("mouseup", stopDrawing);
//canvas.addEventListener("mouseout", stopDrawing);

//// the ReceiveDraw action invoked by the SignalR Hub in WhiteboardHub.cs
//connection.on("ReceiveDraw", data => {
//    // const event = new MouseEvent("mousedown", { clientX: data.x, clientY: data.y });
//    remoteDraw(data); // the function to be called to draw the received canvas coordinates on the client canvas
//});

//// function to draw when the mouse is clicked
//function startDrawing(event) {
//    isDrawing = true;
//    mouseDraw(event);
//}

//// function to draw received canvas coordinates sent from SignalR
//function remoteDraw(data) {
//    draw(data.x, data.y);
//}

//// function to render the client's drawings on the canvas and send to the SignalR hub
//function mouseDraw(event) {
//    if (!isDrawing) return; // only draw when mouse is clicked

//    // get relative x and y coordinates for canvas
//    const x = event.clientX - canvas.getBoundingClientRect().left;
//    const y = event.clientY - canvas.getBoundingClientRect().top;

//    draw(x, y);

//    // send coordinates to SignalR Hub
//    connection.invoke("SendDraw", { x, y })
//        .catch(err => console.error(err.toString()));
//}

//// function to draw on the canvas
//function draw(x, y) {
//    var colorPicker = document.getElementById("colorPicker");
//    // drawwwwwwwwwww
//    context.beginPath();
//    context.arc(x, y, 2, 0, 2 * Math.PI);
//    context.fillStyle = colorPicker.value
//    context.fill();
//    context.closePath();
//}

//// called on mouseup to stop drawing on the canvas
//function stopDrawing() {
//    isDrawing = false;
//}


















//"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//// Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;

//const canvas = document.getElementById("whiteboard"); // fetch the canvas
//const context = canvas.getContext("2d"); // the context for drawing on the whiteboard

//connection.on("ReceiveMessage", function (user, message) {
//    var li = document.createElement("li");
//    document.getElementById("messagesList").appendChild(li);
//    li.textContent = `${user}: ${message}`;
//    messagesList.prepend(li);
//    document.getElementById('messageInput').value = '';
//});

//async function startConnection() {
//    try {
//        await connection.start();
//        console.log("SignalR Connected.");
//        document.getElementById("sendButton").disabled = false;
//    } catch (err) {
//        console.error("Error establishing connection:", err.toString());
//        setTimeout(startConnection, 5000); // Retry connection after 5 seconds
//    }
//}

//connection.onclose(async () => {
//    console.log("Connection closed. Attempting to reconnect...");
//    document.getElementById("sendButton").disabled = true;
//    await startConnection();
//});

//startConnection();

//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;

//    if (connection.state === signalR.HubConnectionState.Connected) {
//        connection.invoke("SendMessage", user, message).catch(function (err) {
//            console.error("SignalR Error: ", err.toString());
//            alert("An error occurred while sending the message: " + err.toString());
//        });
//    } else {
//        alert("Cannot send message. Connection is not in the 'Connected' state.");
//    }

//    event.preventDefault();
//});

//let isDrawing = false;
//let lastX = 0;
//let lastY = 0;

//// Подписываемся на события мыши
//canvas.addEventListener("mousedown", startDrawing);
//canvas.addEventListener("mousemove", mouseDraw);
//canvas.addEventListener("mouseup", stopDrawing);
//canvas.addEventListener("mouseout", stopDrawing);

//// Функция для начала рисования
//function startDrawing(event) {
//    isDrawing = true;
//    const x = event.clientX - canvas.getBoundingClientRect().left;
//    const y = event.clientY - canvas.getBoundingClientRect().top;
//    lastX = x;
//    lastY = y;
//    mouseDraw(event);
//}

//// Функция для рисования на холсте при движении мыши
//function mouseDraw(event) {
//    if (!isDrawing) return;

//    const x = event.clientX - canvas.getBoundingClientRect().left;
//    const y = event.clientY - canvas.getBoundingClientRect().top;

//    drawLine(lastX, lastY, x, y); // Рисуем линию на локальном холсте

//    // Отправляем координаты линии через SignalR
//    connection.invoke("SendDraw", { startX: lastX, startY: lastY }, { endX: x, endY: y })
//        .catch(err => console.error(err.toString()));

//    lastX = x;
//    lastY = y;
//}

//// Функция для рисования линии на холсте
//function drawLine(startX, startY, endX, endY) {
//    var colorPicker = document.getElementById("colorPicker");
//    context.beginPath();
//    context.moveTo(startX, startY);
//    context.lineTo(endX, endY);
//    context.strokeStyle = colorPicker.value;
//    context.lineWidth = 2;
//    context.stroke();
//}

//// Функция вызываемая при отпускании кнопки мыши, чтобы прекратить рисование
//function stopDrawing() {
//    isDrawing = false;
//}

//// Функция для отрисовки полученных координат от SignalR на холсте
//function remoteDraw(data_b, data_e) {
//    drawLine(data_b.x, data_b.y, data_e.x, data_e.y);
//}











"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
document.getElementById("sendButton").disabled = true;

const canvas = document.getElementById("whiteboard"); // fetch the canvas
const context = canvas.getContext("2d"); // the context for drawing on the whiteboard

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user}: ${message}`;
    messagesList.prepend(li);
    document.getElementById('messageInput').value = '';
});

connection.on("ReceiveDraw", function (data1, data2) {
    remoteDraw(data1, data2); // the function to be called to draw the received canvas coordinates on the client canvas
});

async function startConnection() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.error("Error establishing connection:", err.toString());
        setTimeout(startConnection, 5000); // Retry connection after 5 seconds
    }
}

connection.onclose(async () => {
    console.log("Connection closed. Attempting to reconnect...");
    await startConnection();
});

startConnection();

document.getElementById("userInput").addEventListener("input", toggleSendButton);
document.getElementById("messageInput").addEventListener("input", toggleSendButton);

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    if (user !== "" && message !== "") {
        if (connection.state === signalR.HubConnectionState.Connected) {
            connection.invoke("SendMessage", user, message).catch(function (err) {
                console.error("SignalR Error: ", err.toString());
                alert("An error occurred while sending the message: " + err.toString());
            });
        } else {
            alert("Cannot send message. Connection is not in the 'Connected' state.");
        }
    }

    event.preventDefault();
});

function toggleSendButton() {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    document.getElementById("sendButton").disabled = !(user !== "" && message !== "");
}


let isDrawing = false;
let x1 = 0;
let y1 = 0;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", mouseDraw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);


function startDrawing(event) {
    isDrawing = true;
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    x1 = x;
    y1 = y;

    mouseDraw(event);
}

function remoteDraw(data1, data2) {
    drawLine(data1.x, data1.y, data2.x, data2.y);
}

function mouseDraw(event) {
    if (!isDrawing) return; // only draw when mouse is clicked

    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;

    drawLine(x1, y1, x, y);

    // send coordinates to SignalR Hub
    connection.invoke("SendDraw", { x: x1, y: y1 }, { x, y })
        .catch(err => console.error(err.toString()));

    x1 = x;
    y1 = y;
}

function drawLine(startX, startY, endX, endY) {
    var colorPicker = document.getElementById("colorPicker");
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = colorPicker.value;
    context.lineWidth = 2;
    context.stroke();
}

function stopDrawing() {
    isDrawing = false;
}
