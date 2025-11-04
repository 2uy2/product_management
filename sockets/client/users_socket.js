const User = require("../../models/user_model")
module.exports = async (res) => {
   _io.once('connection', (socket) => {
      //người dùng gửi yêu cầu kết bạn
      socket.on('CLIENT_ADD_FRIEND', async (userId) => {
         const myUserId = res.locals.user.id;//id user
         
         //thêm id của user vào phần acceptFriend của người nhận
         const existUserAInB = await User.findOne({//kiểm tra đã tồn tại trước đó chưa
            _id:userId,
            acceptFriends:myUserId
         })
         if(!existUserAInB){
            await User.updateOne({
               _id:userId
            },{
               $push:{acceptFriends:myUserId}
            })
         }

         //thêm id người nhận vào phần requestFiend của user
         const existUserBInA = await User.findOne({//kiểm tra đã tồn tại trước đó chưa
            _id:myUserId,
            requestFriends:userId
         })
         if(!existUserBInA){
            await User.updateOne({
               _id:myUserId
            },{
               $push:{requestFriends:userId}
            })
         }

      })
      //end người dùng gửi yêu cầu kết bạn

      // người dùng gửi huỷ yêu cầu kết bạn
      socket.on('CLIENT_CANCEL_FRIEND', async (userId) => {
         const myUserId = res.locals.user.id;//id user
         
         //xoá id của user ở phần acceptFriend của người nhận
         const existUserAInB = await User.findOne({//kiểm tra đã tồn tại trước đó chưa
            _id:userId,
            acceptFriends:myUserId
         })
         if(existUserAInB){
            await User.updateOne({
               _id:userId
            },{
               $pull:{acceptFriends:myUserId}
            })
         }

         //xoá id người nhận ở phần requestFiend của user
         const existUserBInA = await User.findOne({//kiểm tra đã tồn tại trước đó chưa
            _id:myUserId,
            requestFriends:userId
         })
         if(existUserBInA){
            await User.updateOne({
               _id:myUserId
            },{
               $pull:{requestFriends:userId}
            })
         }

      })
   })
}