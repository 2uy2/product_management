const User = require("../../models/user_model")
module.exports = async (res) => {
   _io.once('connection', (socket) => {
      socket.on('CLIENT_ADD_FRIEND', async (userId) => {
         const myUserId = res.locals.user.id;//id user
         
         //thêm id của user vào phần acceptFriend của người nhận
         const existUserA = await User.findOne({//kiểm tra đã tồn tại trước đó chưa
            _id:userId,
            acceptFriends:myUserId
         })
         if(!existUserA){
            await User.updateOne({
               _id:userId
            },{
               $push:{acceptFriends:myUserId}
            })
         }

         //thêm id người nhận vào phần requestFiend của user
         const existUserB = await User.findOne({//kiểm tra đã tồn tại trước đó chưa
            _id:myUserId,
            requestFriends:userId
         })
         if(!existUserB){
            await User.updateOne({
               _id:myUserId
            },{
               $push:{requestFriends:userId}
            })
         }

      })
   })
}