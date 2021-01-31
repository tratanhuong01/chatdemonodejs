var aud = new Audio("public/mp3/ting.mp3");
var audChat = new Audio("public/mp3/chat.mp3");
const el = document.getElementById('messages');
el.scrollTop = el.scrollHeight;
var socket = io();
document.getElementById("inputMessage").addEventListener("keypress", function (e) {
    if (e.keyCode == 13) {

    }
    else if (document.getElementById("inputMessage").length <= 0) {
        var input = document.getElementById("inputMessage");
        var arr = [socket.id, input.value, "", "", ""];
        socket.emit('chat message', arr);
    }
    else {
        var input = document.getElementById("inputMessage");
        var arr = [socket.id, input.value, "", "", "typing"];
        socket.emit('chat message', arr);
    }
});
document.getElementById("inputMessage").addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        document.getElementById("btn-submit").click();
    }
});
document.getElementById("btn-submit").addEventListener("click", function () {
    var arr = [socket.id, document.getElementById("inputMessage").value, "", "", ""];
    socket.emit('chat message', arr);
    document.getElementById("inputMessage").value = '';
});
function check(length,length1) {
    var num = 0;
    if (length <= 3)
        num = 16;
    else if (length >= 3 && length <= 5)
        num = 2 * 49 + 16;
    else if ((length -3 * 49 + 16) >= length1) 
        num = length -3 * 49 + 16;
    else {
        num = (length - 3) * 49 + 16;
    }
    return num;
}
socket.on('chat message', function (message) {
    var mess_dot = document.getElementsByClassName("mess-dot")[0];
    var length1 = document.getElementById("messages").offsetHeight;
    if (message[4] == "typing" && message[3] != socket.id) {
        audChat.play();
        var cha = document.getElementsByClassName("chat-message");
        mess_dot.style.top = (check(cha.length,length1)) + "px";
        mess_dot.style.display = 'block';
        document.getElementById("messages").scrollTop = length1;
    }
    else if (message[3] == socket.id && message[4] == "") {
        mess_dot.style.display = 'none';
        aud.play();
        load(message, "mess-right");
    }
    else if (message[3] != socket.id && message[4] == "") {
        mess_dot.style.display = 'none';
        aud.play();
        load(message, "mess-left");
    }
    else {
        mess_dot.style.display = 'none';
    }
});
function load(message, nameClass) {
    var div_clone = document.getElementsByClassName(nameClass)[0].cloneNode(true);
    document.getElementById("messages").appendChild(div_clone);
    var chat_mess = document.getElementsByClassName("chat-message");
    var child_mess = chat_mess[chat_mess.length - 1];
    child_mess.getElementsByTagName("span")[0].innerText = message[1];
    document.getElementById("messages").scrollTop = document.getElementById("messages").offsetHeight;
}
function load_dot(message, nameClass) {
    var div_clone = document.getElementsByClassName(nameClass)[0].cloneNode(true);
    var chat_mess = document.getElementsByClassName("chat-message");
    var child_mess = chat_mess[chat_mess.length - 1];
    document.getElementById("messages").scrollTop = document.getElementById("messages").offsetHeight;
    return div_clone;
}