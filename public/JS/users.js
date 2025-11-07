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

//chức năng huỷ gửi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if(listBtnCancelFriend.length>0){
    listBtnCancelFriend.forEach(button =>{
        button.addEventListener("click",()=>{
            button.closest(".box-user").classList.remove("add");
            
            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ remove để thực hiện nút huỷ trên CSS
            const userId = button.getAttribute("btn-cancel-friend"); //lấy ra id người gửi kết bạn cho user
            // console.log(userId)
            socket.emit("CLIENT_CANCEL_FRIEND",userId);
        })
    })
}
//end chức năng huỷ gửi yêu cầu
//chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if(listBtnRefuseFriend.length>0){
    listBtnRefuseFriend.forEach(button =>{
        button.addEventListener("click",()=>{
            button.closest(".box-user").classList.add("refuse"); 
            
            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ add để thực hiện nút huỷ trên CSS
            const userId = button.getAttribute("btn-refuse-friend"); //lấy ra id người gửi kết bạn cho user
            // console.log(userId)
            socket.emit("CLIENT_REFUSE_FRIEND",userId);
        })
    })
}
//end chức năng từ chối kết bạn
//chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if(listBtnAcceptFriend.length>0){
    listBtnAcceptFriend.forEach(button =>{
        button.addEventListener("click",()=>{
            button.closest(".box-user").classList.add("accepted"); 
            
            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ add để thực hiện nút huỷ trên CSS
            const userId = button.getAttribute("btn-accept-friend"); //lấy ra id người gửi kết bạn cho user
            // console.log(userId)
            socket.emit("CLIENT_ACCEPT_FRIEND",userId);
        })
    })
}
//chức năng chấp nhận kết bạn

//SERVER_RETURN_LENGTH_ACCEPT_FRIEND 
socket.on('SERVER_RETURN_LENGTH_ACCEPT_FRIEND',(data)=>{
    // console.log(data)
    const badgeUsersAccept = document.querySelector("[badge-users-accept]");
    const userId = badgeUsersAccept.getAttribute("badge-users-accept");
    if(userId==data.userId){
        badgeUsersAccept.innerHTML = data.lengthAcceptFriends
    }
    
    
})
// end SERVER_RETURN_LENGTH_ACCEPT_FRIEND

