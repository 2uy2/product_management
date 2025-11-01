const  uploadToCloudinary = require("../../helpers/uploadToCloudinary")
const Chat = require("../../models/chat_model");

module.exports = async(res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    _io.once('connection', (socket) => { //socket  là biếnvsocket con được tạo ra, còn socket tổng là io
        // console.log('a user connected', socket.id);
        socket.on('CLIENT_SEND_MESSAGE', async (data) => {
            // data.image trả về dạng buffer nên ta phải chuyển nó thành link
            let images = [];
            for (const imageBuffer of data.images) {
                const link = await uploadToCloudinary(imageBuffer);
                images.push(link)
            }
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images
            })
            await chat.save();

            //trả data về client
            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                fullName: fullName,
                content: data.content,
                images: images
            })
        })
        //nhận typing
        socket.on("CLIENT_SEND_TYPING", (type) => {
            // console.log(type);
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                user_id: userId,
                fullName: fullName,
                type: type
            })
        })
    });
}