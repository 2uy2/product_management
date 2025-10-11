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
//get user/login 
module.exports.login=async (req,res)=>{
    res.render("client/pages/user/login",{
        pageTitle:"Đăng nhập tài khoản"
    })
}
//post user/login 
module.exports.loginPost=async (req,res)=>{
   const email = req.body.email
   const password = req.body.password
   const user = await User.findOne({
    email:email,
    deleted:false
   })
   if(!user){
    req.flash("error","email không tồn tại");
    res.redirect(req.get("referer"));
    return;
   }
   if(md5(password)!= user.password){
    req.flash("error","mật khẩu không chính xác");
    res.redirect(req.get("referer"));
    return;
   }
   if(user=="inactive"){
    req.flash("error","tài khoản bị chặn");
    res.redirect(req.get("referer"));
    return;
   }
   res.cookie("tokenUser",user.tokenUser);
   res.redirect("/")
}