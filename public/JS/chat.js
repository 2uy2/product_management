import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';
const upload = new FileUploadWithPreview.FileUploadWithPreview("upload-image", {
    multiple: true,
    maxFileCount: 6
});

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault(); //không bị nhảy trang
        const content = e.target.elements.content.value;
        const images = upload.cachedFileArray || [];
        console.log(images)
        if (content || images.length > 0) {
            //gửi ảnh hoặc content lên server
            socket.emit("CLIENT_SEND_MESSAGE", {
                //truyền dữ liệu text trong input và ảnh vào trong một object
                content: content,
                images: images
            });
            e.target.elements.content.value = "";
            upload.resetPreviewPanel(); //clear select image
            socket.emit("CLIENT_SEND_TYPING", "hidden"); //ẩn typing khi gửi tin nhắn xong
        }
    })
}
// END CLIENT_SEND_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => { //khi nhận được sẽ cập nhật tạm thời lên giao diện
    console.log(data);
    const myId = document.querySelector("[my-id]").getAttribute("my-id"); //lấy thuộc tính [my-id]
    const body = document.querySelector(".chat .inner-body");
    const boxTyping = document.querySelector(".inner-list-typing");
    const div = document.createElement("div");
    let htmlFullName = "";
    let htmlContent = "";
    let htmlImages = "";

    if (myId == data.user_id) {
        div.classList.add('inner-outgoing');
    } else {
        div.classList.add('inner-incomming');
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`
    }
    if (data.content) {
        htmlContent = `<div class="inner-content">${data.content}</div> `

    }
    if (data.images) {
        htmlImages += ` <div class="inner-images"> `;
        for (const image of data.images) {
            htmlImages +=
            `
            <img src="${image}">
            `
        }

        htmlImages += `</div>`
    }

    div.innerHTML = `
    ${htmlFullName}
    ${htmlContent}
    ${htmlImages}
    
    `;

    body.insertBefore(div, boxTyping); //đảm bảo tin nhắn vừa gửi được đưa lên trước
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




//show typing 
var timeOut;
const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");
    //nếu người ta ngừng gõ thì không hiện typing
    clearTimeout(timeOut); //xoá đi hàm timeOut đang chạy trước đó
    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000)
}

//end showTyping

//emoj-picker
//show Popup
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip);
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown');
    }
}

//inser icon to input
// document.querySelector('emoji-picker')
//     .addEventListener('emoji-click', event => console.log(event.detail));


const emojPicker = document.querySelector("emoji-picker")
if (emojPicker) {

    const inputChat = document.querySelector(".chat .inner-form input[name='content']");

    emojPicker.addEventListener("emoji-click", event => {
        const icon = event.detail.unicode;
        console.log(icon);
        inputChat.value = inputChat.value + icon;
        //đảm bảo khi chèn icon luôn luôn vị trí cuối cùng
        const end = inputChat.value.length;
        inputChat.setSelectionRange(end, end);
        inputChat.focus();
        showTyping();
        //end đảm bảo khi chèn icon luôn luôn vị trí cuối cùng
    })




    // xử lý typing CLIENT_SEND_TYPING
    inputChat.addEventListener("keyup", () => {
        showTyping();
    })
}
// end emoj-picker

// server return typing
const elementListTyping = document.querySelector(".chat .inner-list-typing");


if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        if (data.type == "show") {
            const existTyping = elementListTyping.querySelector(`[user-id="${data.user_id}"]`);
            if (!existTyping) {
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", data.user_id);
                boxTyping.innerHTML = `
                    <div class="inner-name") >${data.fullName}</div>
                    <div class="inner-dots")>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
        `;

                elementListTyping.appendChild(boxTyping);
                bodyChat.scrollTop = bodyChat.scrollHeight; //tự scroll xuống khi có typing
            }

        } else {
            const boxTypingRemove = elementListTyping.querySelector(`[user-id="${data.user_id}"]`);
            if (boxTypingRemove) {
                elementListTyping.removeChild(boxTypingRemove); //xoá thẻ con
            }
        }


    })
}

//end server return typing