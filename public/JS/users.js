// chức năng yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if(listBtnAddFriend.length>0){
    listBtnAddFriend.forEach(button =>{
        button.addEventListener("click",()=>{
            button.closest(".box-user").classList.add("add");
            
            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ add để thực hiện nút huỷ trên CSS
            const userId = button.getAttribute("btn-add-friend"); //lấy ra id người gửi kết bạn cho user
            console.log(userId)
            socket.emit("CLIENT_ADD_FRIEND",userId);
        })
    })
}
// end chức năng yêu cầu