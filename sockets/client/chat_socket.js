const  uploadToCloudinary = require("../../helpers/uploadToCloudinary")
const Chat = require("../../models/chat_model");



module.exports = async(req,res) => {
    const roomChatId = req.params.roomChatId;
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    _io.once('connection', (socket) => { //socket  là biếnvsocket con được tạo ra, còn socket tổng là io
        // console.log('a user connected', socket.id);
        socket.join(roomChatId) //join giúp bả mật từ phía admin
        socket.on('CLIENT_SEND_MESSAGE', async (data) => {
            // data.image trả về dạng buffer nên ta phải chuyển nó thành link
            let images = [];
            for (const imageBuffer of data.images) {
                const link = await uploadToCloudinary(imageBuffer);
                images.push(link)
            }
            //lưu vào database
            const chat = new Chat({
                user_id: userId,
                room_chat_id:roomChatId,
                content: data.content,
                images: images
            })
            await chat.save();

            //trả data về client
            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                fullName: fullName,
                content: data.content,
                images: images
            })
        })
        //nhận typing
        socket.on("CLIENT_SEND_TYPING", (type) => {
            // console.log(type);
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
                user_id: userId,
                fullName: fullName,
                type: type
            })
        })
    });
}