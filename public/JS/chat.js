// CLIENT_SEND_MESSAGE
const formSendData =  document.querySelector(".chat .inner-form");
if(formSendData){
    formSendData.addEventListener("submit",(e)=>{
        e.preventDefault();//không bị nhảy trang
        const content = e.target.elements.content.value;
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE",content);
            e.target.elements.content.value=""
        }
    })
}
// END CLIENT_SEND_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE",(data)=>{ //khi nhận được sẽ cập nhật tạm thời lên giao diện
    console.log(data);
    const myId = document.querySelector("[my-id]").getAttribute("my-id");//lấy thuộc tính [my-id]
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div");
    let htmlFullName= "";

    if (myId == data.user_id){
        div.classList.add('inner-outgoing');
    }
    else {
        div.classList.add('inner-incomming');
        htmlFullName =   `<div class="inner-name">${data.fullName}</div>`
    }
    
    div.innerHTML=`
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
    `;
    body.appendChild(div);
    console.log(data.user_id)
    console.log(myId)
})
// end SERVER_RETURN_MESSAGE