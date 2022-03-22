window.onload = function () {
    //document.body.innerHTML = authorizationTemplate();
    //new Authorization();

    const socket = io(window.location.origin);

    document.getElementById('sendMessage').addEventListener('click', () => {
        const userName = document.getElementById('userName').value;
        const message = document.getElementById('message').value;
        if (userName && message) {
            socket.emit('sendMessage', { userName, message });
            document.getElementById('message').value = '';
        }
    });

    function newChatMessageHandler(data) {
        const { userName, message } = data;
        const newMessage = document.createElement('div');
        newMessage.innerHTML = `<b>${userName}: </b><i>${message}</i>`;
        document.getElementById('chat').appendChild(newMessage);
    }

    socket.on('newChatMessage', newChatMessageHandler);
}