const User = require("../../models/user_model")
module.exports = async (res) => {
   _io.once('connection', (socket) => {
      //người dùng gửi yêu cầu kết bạn
      socket.on('CLIENT_ADD_FRIEND', async (userId) => {
         const myUserId = res.locals.user.id; //id user

         //thêm id của user vào phần acceptFriend của người nhận
         const existUserAInB = await User.findOne({ //kiểm tra đã tồn tại trước đó chưa
            _id: userId,
            acceptFriends: myUserId
         })
         if (!existUserAInB) {
            await User.updateOne({
               _id: userId
            }, {
               $push: {
                  acceptFriends: myUserId
               }
            })
         }

         //thêm id người nhận vào phần requestFiend của user
         const existUserBInA = await User.findOne({ //kiểm tra đã tồn tại trước đó chưa
            _id: myUserId,
            requestFriends: userId
         })
         if (!existUserBInA) {
            await User.updateOne({
               _id: myUserId
            }, {
               $push: {
                  requestFriends: userId
               }
            })
         }
         // lấy độ dài acceptFriends của của B trả về cho B
         const infoUserB = await User.findOne({
            _id:userId
         });
         const lengthAcceptFriends = infoUserB.acceptFriends.length;
         // console.log(lengthAcceptFriends)
         socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
            userId:userId,
            lengthAcceptFriends:lengthAcceptFriends

         })
         //Lấy thông tin của A trả về cho B
         const infoUserA = await User.findOne({
            _id:myUserId
         }).select("id avatar fullName");
         socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND",{
            userId:userId,
            infoUserA:infoUserA
         })


      })
      //end người dùng gửi yêu cầu kết bạn

      // người dùng gửi huỷ yêu cầu kết bạn
      socket.on('CLIENT_CANCEL_FRIEND', async (userId) => {
         const myUserId = res.locals.user.id; //id user

         //xoá id của user ở phần acceptFriend của người nhận
         const existUserAInB = await User.findOne({ //kiểm tra đã tồn tại trước đó chưa
            _id: userId,
            acceptFriends: myUserId
         })
         if (existUserAInB) {
            await User.updateOne({
               _id: userId
            }, {
               $pull: {
                  acceptFriends: myUserId
               }
            })
         }

         //xoá id người nhận ở phần requestFiend của user
         const existUserBInA = await User.findOne({ //kiểm tra đã tồn tại trước đó chưa
            _id: myUserId,
            requestFriends: userId
         })
         if (existUserBInA) {
            await User.updateOne({
               _id: myUserId
            }, {
               $pull: {
                  requestFriends: userId
               }
            })
         }
         // lấy độ dài acceptFriends của của B trả về cho B
         const infoUserB = await User.findOne({
            _id:userId
         });
         const lengthAcceptFriends = infoUserB.acceptFriends.length;
         // console.log(lengthAcceptFriends)
         socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
            userId:userId,
            lengthAcceptFriends:lengthAcceptFriends

         })
         // lấy userid của A trả về cho B
         socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND",{
            userId:userId,
            userIdA:myUserId

         })

      })
      // end người dùng gửi huỷ yêu cầu kết bạn

      // người dùng từ chối kết bạn
      socket.on('CLIENT_REFUSE_FRIEND', async (userId) => {
         const myUserId = res.locals.user.id; //id user

         //xoá id của người nhận ở phần acceptFriend của user
         const existUserAInB = await User.findOne({ //kiểm tra đã tồn tại trước đó chưa
            _id: myUserId,
            acceptFriends: userId
         })
         if (existUserAInB) {
            await User.updateOne({
               _id: myUserId
            }, {
               $pull: {
                  acceptFriends: userId
               }
            })
         }

         //xoá id user  ở phần requestFiend của người kia
         const existUserBInA = await User.findOne({ //kiểm tra đã tồn tại trước đó chưa
            _id: userId,
            requestFriends: myUserId
         })
         if (existUserBInA) {
            await User.updateOne({
               _id: userId
            }, {
               $pull: {
                  requestFriends: myUserId
               }
            })
         }

      })
      // end người dùng từ chối kết bạn


      // người dùng chấp nhận kết bạn

      socket.on('CLIENT_ACCEPT_FRIEND', async (userId) => {
         const myUserId = res.locals.user.id; //id user
         //thêm {userId, room_chat_id } của user vào friendlist người gửi
         //xoá id của người nhận ở phần acceptFriend của user
         const existUserAInB = await User.findOne({ //kiểm tra đã tồn tại trước đó chưa
            _id: myUserId,
            acceptFriends: userId
         })
         if (existUserAInB) {
            await User.updateOne({
               _id: myUserId
            }, {
               $pull: {
                  acceptFriends: userId
               },
               $push: {
                  friendList: {
                     user_id: userId,
                     room_chat_id:""
                  }
               }

            })
         }

         //thêm {userId, room_chat_id } của người gửi vào friendlist user
         //xoá id user  ở phần requestFiend của người kia
         const existUserBInA = await User.findOne({ //kiểm tra đã tồn tại trước đó chưa
            _id: userId,
            requestFriends: myUserId
         })
         if (existUserBInA) {
            await User.updateOne({
               _id: userId
            }, {
               $pull: {
                  requestFriends: myUserId
               },
               $push: {
                  friendList: {
                     user_id: myUserId,
                     room_chat_id: ""
                  }
               }
            })
         }
         
      })

      //end người dùng chấp nhận kết bạn

   })
}