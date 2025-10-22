const Chat = require("../../models/chat_model");
const User = require("../../models/user_model")
//get /chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    //socketio
    _io.once('connection', (socket) => { //socket  là biếnvsocket con được tạo ra, còn socket tổng là io
        // console.log('a user connected', socket.id);
        socket.on('CLIENT_SEND_MESSAGE',async(content) => {
            //  lưu vào data base
            // console.log(content)
            const chat = new Chat({
                user_id: userId,
                content: content
            })
            await chat.save()
        })
    });
    //end socketio
    //lấy ra data
    const chats = await Chat.find({
        deleted:false
    });
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id:chat.user_id
        }).select("fullName");

        chat.infoUser=infoUser;
    }
    
    

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats:chats
    })
}