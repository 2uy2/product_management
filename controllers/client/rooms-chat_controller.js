const User = require("../../models/user_model")
const RoomChat = require("../../models/room-chat_model")
//get /rooms-chat
module.exports.index=async(req,res)=>{
    const userId= res.locals.user.id;
    const listRoomChat = await RoomChat.find({
        "users.user_id":userId,
        typeRoom:"group",
        deleted:false,
        
    })
    // console.log(listRoomChat)
    res.render("client/pages/rooms-chat/index",{
        pageTitle:"Danh sách phòng chat",
        listRoomChat:listRoomChat
    })
}
//get /rooms-chat/create
module.exports.create=async(req,res)=>{
    const friendList = res.locals.user.friendList;
    for (const friend of friendList) {
        const infoUser= await User.findOne({
            _id:friend.user_id,
        }).select("fullName avatar");
        friend.infoUser=infoUser;
        
    }
   
    res.render("client/pages/rooms-chat/create",{
        pageTitle:"tạo phòng chat",
        friendList:friendList
    })
}
//post /rooms-chat/create
module.exports.createPost=async(req,res)=>{
    const title = req.body.title;
    const usersId=req.body.usersId;
    console.log(usersId)
    
    const dataChat={
        title:title,
        typeRoom:"group",
        users:[]
    };
    //thêm danh sách người vào group chat
    usersId.forEach(userId => {
        dataChat.users.push({
            user_id:userId,
            role:"user"
        })
    });
    //tạo quyền chủ phòng cho người tạo
   dataChat.users.push({
        user_id:res.locals.user.id,
        role:"superAdmin"
   })

    // console.log(dataChat);
    const room = new RoomChat(dataChat);
    await room.save();
    
    res.redirect(`/chat/${room.id}`)

}
