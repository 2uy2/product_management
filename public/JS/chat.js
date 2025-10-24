import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault(); //không bị nhảy trang
        const content = e.target.elements.content.value;
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.content.value = ""
        }
    })
}
// END CLIENT_SEND_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => { //khi nhận được sẽ cập nhật tạm thời lên giao diện
    console.log(data);
    const myId = document.querySelector("[my-id]").getAttribute("my-id"); //lấy thuộc tính [my-id]
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div");
    let htmlFullName = "";

    if (myId == data.user_id) {
        div.classList.add('inner-outgoing');
    } else {
        div.classList.add('inner-incomming');
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`
    }

    div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
    `;
    body.appendChild(div);
    bodyChat.scrollTop = bodyChat.scrollHeight; //croll cách top một đoạn bằng chiều cao body đó sau khi đã nhận hoặc gửi tin nhắn
    console.log(data.user_id)
    console.log(myId)
})
// end SERVER_RETURN_MESSAGE

// scroll chat to bottom (khi load lại trang tin nhắn scroll dưới cùng(tin nhắn mới nhất))
const bodyChat = document.querySelector(".chat .inner-body")
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight; //croll cách top một đoạn bằng chiều cao body đó
}
// end scroll chat to bottom

//emoj-picker
//show Popup
const buttonIcon = document.querySelector(".button-icon");
if(buttonIcon){
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip);
    buttonIcon.onclick=()=> {
        tooltip.classList.toggle('shown');
    }
}

//inser icon to input
// document.querySelector('emoji-picker')
//     .addEventListener('emoji-click', event => console.log(event.detail));
const emojPicker = document.querySelector("emoji-picker")
if (emojPicker){
    const inputChat = document.querySelector(".chat .inner-form input[name='content']")
    emojPicker.addEventListener("emoji-click",event=>{
        const icon = event.detail.unicode;
        console.log(icon);
        inputChat.value=inputChat.value+icon;
    })
}
// end emoj-picker
