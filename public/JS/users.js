// chức năng yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");

            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ add để thực hiện nút huỷ trên CSS
            const userId = button.getAttribute("btn-add-friend"); //lấy ra id người gửi kết bạn cho user
            console.log(userId)
            socket.emit("CLIENT_ADD_FRIEND", userId);
        })
    })
}
// end chức năng yêu cầu

//chức năng huỷ gửi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");

            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ remove để thực hiện nút huỷ trên CSS
            const userId = button.getAttribute("btn-cancel-friend"); //lấy ra id người gửi kết bạn cho user
            // console.log(userId)
            socket.emit("CLIENT_CANCEL_FRIEND", userId);
        })
    })
}
//end chức năng huỷ gửi yêu cầu
//chức năng từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
    listBtnRefuseFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse");

            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ add để thực hiện nút huỷ trên CSS
            const userId = button.getAttribute("btn-refuse-friend"); //lấy ra id người gửi kết bạn cho user
            // console.log(userId)
            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        })
    })
}
//end chức năng từ chối kết bạn
//chức năng chấp nhận kết bạn
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("accepted");

            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ add để thực hiện nút huỷ trên CSS
            const userId = button.getAttribute("btn-accept-friend"); //lấy ra id người gửi kết bạn cho user
            // console.log(userId)
            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        })
    })
}
//end chức năng chấp nhận kết bạn

//SERVER_RETURN_LENGTH_ACCEPT_FRIEND 
socket.on('SERVER_RETURN_LENGTH_ACCEPT_FRIEND', (data) => {
    // console.log(data)
    const badgeUsersAccept = document.querySelector("[badge-users-accept]");
    const userId = badgeUsersAccept.getAttribute("badge-users-accept");
    badgeUsersAccept.classList.add("active")
    if (userId == data.userId) { //xác nhận chỉ hiện thông báo cho đúng người
        badgeUsersAccept.innerHTML = data.lengthAcceptFriends
    }


})
// end SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on('SERVER_RETURN_INFO_ACCEPT_FRIEND', (data) => {
    // trang lời mời kết bạn
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    if (dataUsersAccept){
 const userId = dataUsersAccept.getAttribute("data-users-accept");
    if (userId == data.userId) { //xác nhận chỉ hiện thông báo cho đúng người
        //vẽ user ra giao diện
        const newBoxUser = document.createElement("div");
        newBoxUser.classList.add("col-6");
        newBoxUser.setAttribute("user-id", data.infoUserA._id)
        newBoxUser.innerHTML =
            `
        <div class="box-user ">
            <div class="inner-avatar">
                <img src="${data.infoUserA.avatar ? data.infoUserA.avatar : '/images/defaultAvatar.png'}" alt="${data.infoUserA.fullName}">
            </div>
            <div class="inner-info">
                <div class="inner-name">${data.infoUserA.fullName}</div>
                <div class="inner-buttons">
                    <button 
                        class="btn btn-sm btn-primary mr-1"
                        btn-accept-friend="${data.infoUserA._id}"
                    >
                        chấp nhận 
                    </button>
                    <button 
                        class="btn btn-sm btn-secondary mr-1" 
                        btn-refuse-friend="${data.infoUserA._id}"
                    >
                        từ chối 
                    </button>
                    <button 
                        class="btn btn-sm btn-secondary 
                        mr-1" btn-deleted-friend="" disabled=""
                    >
                        đã xoá 
                    </button>
                    <button 
                        class="btn btn-sm btn-secondary 
                        mr-1" btn-accepted-friend="" disabled=""
                    >
                        đã chấp nhận 
                    </button>
                </div>
            </div>
        </div>`
        dataUsersAccept.appendChild(newBoxUser);
        // xoá lời mời kết bạn
        const listBtnRefuseFriend = document.querySelector("[btn-refuse-friend]")
        listBtnRefuseFriend.addEventListener("click", () => {
            listBtnRefuseFriend.closest(".box-user").classList.add("refuse");

            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ add để thực hiện nút huỷ trên CSS
            const userId = listBtnRefuseFriend.getAttribute("btn-refuse-friend"); //lấy ra id người gửi kết bạn cho user
            // console.log(userId)
            socket.emit("CLIENT_REFUSE_FRIEND", userId);
        })
        // end xoá lời mời kết bạn
        // chấp nhận lời mời kết bạn
        const BtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");

        BtnAcceptFriend.addEventListener("click", () => {
            BtnAcceptFriend.closest(".box-user").classList.add("accepted");

            //closetlấy ra thẻ cha muốn lấy mà không cần parent
            // thêm thẻ add để thực hiện nút huỷ trên CSS
            const userId = button.getAttribute("btn-accept-friend"); //lấy ra id người gửi kết bạn cho user
            // console.log(userId)
            socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        })
        // end  chấp nhận lời mời kết bạn

    }
    }
   
    //hết trang lời mời kết bạn
    
    // trang danh sách người dùng
    const dataUsersNotFriend = document.querySelector("[data-users-not-friend]");
    if(dataUsersNotFriend){
        const userId= dataUsersNotFriend.getAttribute("data-users-not-friend");
        if (userId == data.userId) { //xác nhận chỉ hiện thông báo cho đúng người
        //xoá A khỏi danh sách của B
        const boxUserRemove = dataUsersNotFriend.querySelector(`[user-id="${data.infoUserA._id}"]`);
        dataUsersNotFriend.removeChild(boxUserRemove);
    }

    }
    //end trang danh sách người dùng

})
// end SERVER_RETURN_INFO_ACCEPT_FRIEND

//SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    const userId = dataUsersAccept.getAttribute("data-users-accept");
    if (userId == data.userId) { //xác nhận chỉ hiện thông báo cho đúng người
        //xoá A khỏi danh sách của B
        const boxUserRemove = dataUsersAccept.querySelector(`[user-id="${data.userIdA}"]`);
        dataUsersAccept.removeChild(boxUserRemove);
    }

})
// end SERVER_RETURN_USER_ID_CANCEL_FRIEND

//SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE",(userId)=>{
    const dataUsersFriend = document.querySelector("[data-users-friend]");
    if(dataUsersFriend){
        const boxUser = dataUsersFriend.querySelector(`[user-id="${userId}"`);
        if(boxUser){
            boxUser.querySelector("[status]").setAttribute("status","online");
        }
    }

})
// end SERVER_RETURN_USER_ONLINE

//SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE",(userId)=>{
    const dataUsersFriend = document.querySelector("[data-users-friend]");
    if(dataUsersFriend){
        const boxUser = dataUsersFriend.querySelector(`[user-id="${userId}"`);
        if(boxUser){
            boxUser.querySelector("[status]").setAttribute("status","offline");
        }
    }

})
// end SERVER_RETURN_USER_ONLINE