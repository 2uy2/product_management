const md5 = require("md5");
const User = require("../../models/user_model")
const ForgotPassword = require("../../models/forgot-password_model")
const generate = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail")
const Cart = require("../../models/cart_model")
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
   await User.updateOne({
    _id:user.id
   },{
    statusOnline:"online"
   });

   //lưu user_id vào model cart collection
   await Cart.updateOne({
        _id:req.cookies.cartId
   },{
    
    user_id:user.id
   })

   
   res.redirect("/")
}

//get user/logout
module.exports.logout=async(req,res)=>{
    await User.updateOne({
        _id:res.locals.user.id
    },{
        statusOnline:"offline"
    })
    res.clearCookie("tokenUser");
    res.redirect("/user/login");
}

//get user/password/forgot
module.exports.forgotPassword=async(req,res)=>{
    res.render("client/pages/user/forgot-password",{
        pageTitle:"Lấy lại mật khẩu"
    })
}
//post user/password/forgot
module.exports.forgotPasswordPost=async(req,res)=>{
    const email =req.body.email;
    const user = await User.findOne({
        email:req.body.email,
        deleted:false
    })
    if (!user){
        req.flash("error","email không tồn tại");
        res.redirect(req.get("referer"));
        return;
    }
    //việc 1: tạo mã OTP và lưu OTP và email vào collecttion forget-password
    const otp = generate.generateRandomNumber(8)
    const objectForgotPassword = {
        email:email,
        otp:otp,
        expireAt:Date.now() //lấy mốc thời gian hiện tại
    };

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    //việc 2: gửi mã OTP qua email của user
    const subject =`Mã OTP xác xinh lấy lại mật khẩu`;
    const html=`
        Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP
    `
    sendMailHelper.sendMail(email,subject,html)
    res.redirect(`/user/password/otp?email=${email}`);
   
}

//get /user/password/otp 
module.exports.otpPassword= async (req,res)=>{
    const email = req.query.email ;
    res.render("client/pages/user/otp-password",{
        pageTitle:"Nhập mã OTP",
        email:email
    })
    
}

//post /user/password/otp 
module.exports.otpPasswordPost=async(req,res)=>{
    const email=req.body.email;
    const otp=req.body.otp;
    const result = await ForgotPassword.findOne({
        email:email,
        otp:otp
    })
    console.log(result);
    if(!result){
        req.flash("error","OTP không hợp lệ");
        res.redirect(req.get("referer"));
        return;
    }
    //sau khi mã otp xác nhận là đúng user rồi
    const user = await User.findOne({
        email:email
    });
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/user/password/reset")
}

//get /user/password/reset
module.exports.resetPassword=async(req,res)=>{
    res.render("client/pages/user/reset-password",{
        pageTitle:"Đổi mật khẩu"
    })
    const tokenUser= req.cookies.tokenUser;
    console.log(tokenUser)
   
}
//post /user/password/reset
module.exports.resetPasswordPost=async (req,res)=>{
    const password = req.body.password;
    const tokenUser= req.cookies.tokenUser;
    console.log(tokenUser)

    await User.updateOne({
        tokenUser:tokenUser        
    },{
        password:md5(password)
    })
    req.flash("success","đổi mật khẩu thành công")
    res.redirect("/");
   
}

//get /user/info
module.exports.info=async(req,res)=>{
    res.render("client/pages/user/info",{
        pageTitle:"Thông tin tài khoản"
    });
}