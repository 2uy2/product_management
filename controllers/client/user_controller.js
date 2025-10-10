const md5 = require("md5");
const User = require("../../models/user_model")
//get /user/register
module.exports.register = async (req,res)=>{
    res.render("client/pages/user/register",{
        pageTitle:"Đăng ký tài khoản"
    })
}
//post /user/register
module.exports.registerPost = async (req,res)=>{
    console.log(req.body)
    const existEmail =await  User.findOne({
        email:req.body.email,
        deleted:false
    })
    if(existEmail){
        req.flash("error","email đã tồn tại");
        res.redirect(req.get("referer"));
        return;
    }
    req.body.password=md5(req.body.password)//mã hoá mật khẩu trước khi lưu
    const user = new User(req.body);
    await user.save();  
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/");
}