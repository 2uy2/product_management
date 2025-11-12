const User = require("../../models/user_model");
const usersSocket = require("../../sockets/client/users_socket")

//get users/not-friend
module.exports.notFriend = async (req, res) => {
    //socket
    usersSocket(res)
    //end socket

    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId
    })
    const requestFiends = myUser.requestFriends;
    const acceptFriends = myUser.acceptFriends;
    const friendList = myUser.friendList;
    const friendListId = friendList.map(item=>{
        return item.user_id;
    })

    const users = await User.find({
        // _id:{$ne:userId}, //not equal (loại bỏ tìm kiếm)
        //_id:{$nin:requestFiend},//nin là loại những người id có trong danh sách requestFriend
        //cú pháp thoã mạn hai điều kiện trên để không bị ghe đè lệnh
        $and: [{
                _id: {
                    $ne: userId
                }
            },
            {
                _id: {
                    $nin: requestFiends
                }
            },
            {
                _id: {
                    $nin: acceptFriends
                }
            },
            {
                _id: {
                    $nin: friendListId
                }
            },
        ],
        deleted: false,
        status: "active"
    }).select("avatar fullName");

    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}

//end get users/not-friend

//get users/request
module.exports.request = async (req, res) => {
    //socket
    usersSocket(res)
    //end socket
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId,
    })
    const requestFriends = myUser.requestFriends;
    const users = await User.find({
        _id: {
            $in: requestFriends
        },
        status: "active",
        deleted: false,
    }).select("id avatar fullName");
    // console.log(users)


    res.render("client/pages/users/request", {
        pageTitle: "lời mời đã gửi",
        users: users
    })
}
//end get users/request
//get users/accept
module.exports.accept = async (req, res) => {
    usersSocket(res)
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId,
    })
    const acceptFriends = myUser.acceptFriends;
    const users = await User.find({
        _id: {
            $in: acceptFriends
        },
        status: "active",
        deleted: false,
    }).select("id avatar fullName");
    // console.log(users)
    

    res.render("client/pages/users/accept", {
        pageTitle: "lời mời đã nhận",
        users: users
    })
}
//get users/accept
module.exports.friends = async (req, res) => {
    usersSocket(res)
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId,
    })
    const friendList = myUser.friendList;
    const friendListId = friendList.map(item =>{
        return item.user_id
    })
    const users = await User.find({
        _id: {
            $in: friendListId
        },
        status: "active",
        deleted: false,
    }).select("id avatar fullName statusOnline");
    // console.log(users)
    // res.send("ok")
    users.forEach(user=>{
        const  infoUser= friendList.find(item=>{
            return item.user_id==user.id
        });
        user.roomChatId=infoUser.room_chat_id
    })

    res.render("client/pages/users/friends", {
        pageTitle: "danh sách bạn bè",
        users: users
    })
}