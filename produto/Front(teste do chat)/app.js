var stompClient = null;

function connect() {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
        stompClient.subscribe('/topic/messages', function (response) {
            showMessage(JSON.parse(response.body));
        });
    });
}

function showMessage(message) {
    var messagesDiv = document.getElementById('messages');
    var messageDiv = document.createElement('div');
    messageDiv.innerHTML = '<strong>' + message.sender + ':</strong> ' + message.content;
    messagesDiv.appendChild(messageDiv);
}

function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var messageContent = messageInput.value;
    var sender = 'Usuário'; // Pode ser dinâmico se necessário
    stompClient.send("/app/chat", {}, JSON.stringify({
        'sender': sender,
        'content': messageContent
    }));
    messageInput.value = '';
}

document.getElementById('sendButton').addEventListener('click', sendMessage);

connect();
