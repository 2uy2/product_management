const RoomChat = require("../../models/room-chat_model")
//kiểm tra xem có quyền được vào phòng chat này không
module.exports.isAccess = async (req, res, next) => {
    const userId = res.locals.user.id;
    const roomChatId = req.params.roomChatId;
    // phải thêm try catch, vì nếu rõ lung tung server sẽ die
    try {
        const isAccessRoomChat = await RoomChat.findOne({
            _id: roomChatId,
            deleted: false,
            "users.user_id": userId
        })
        if (isAccessRoomChat) {
            next();
        } else {
            res.redirect("client/pages/errors/errors404");
        }
    } catch (error) {
        res.redirect("client/pages/errors/errors404");
    }

}