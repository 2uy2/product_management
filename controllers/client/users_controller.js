const User = require("../../models/user_model")
//get users/not-friend
module.exports.notFriend = async(req,res)=>{
    const userId = res.locals.user.id;
    
    const users = await User.find({
        _id:{$ne:userId}, //not equal (loại bỏ tìm kiếm)
        deleted:false,
        status:"active"
    }).select("avatar fullName");
    
    res.render("client/pages/users/not-friend",{
        pageTitle:"Danh sách người dùng",
        users:users
    })
}