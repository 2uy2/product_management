//get /chat
module.exports.index = async (req, res) => {
    _io.on('connection', (socket) => { //socket  là biếnvsocket con được tạo ra, còn socket tổng là io
        console.log('a user connected', socket.id);

    });

    res.render("client/pages/chat/index", {
        pageTitle: "Chat"
    })
}