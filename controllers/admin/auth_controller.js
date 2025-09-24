const systemConfig = require("../../config/system");
const Account = require("../../models/acccount_model");
// const Account = require("../../models/acccount_model");
const Role = require("../../models/role_model");
const md5 = require('md5');

//get /admin/auth/login
module.exports.login = async (req, res) => {
   if (req.cookies.token) {
      const user = await Account.findOne({
         token: req.cookies.token
      })
      if(user){
         res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
      }
      else{
        
      }
   }
   res.render("admin/pages/auth/login", {
      pageTitle: "đăng nhập"
   })
}
//post /admin/auth/login
module.exports.loginPost = async (req, res) => {
   const email = req.body.email
   const password = req.body.password
   //kiểm tra email hợp lệ không
   const user = await Account.findOne({
      email: email,
      deleted: false
   })
   if (!user) {
      req.flash("error", "email không tồn tại");
      res.redirect(req.get("referer"));
      return; // return để không chạy xuốn code dưới
   }
   //kiểm tra mật khẩu
   if (md5(password) != user.password) { // vì passwword đươc mã hoá nên ohair mã hoá password đăng nhập
      req.flash("error", "sai mật khẩu");
      res.redirect(req.get("referer"));
      return; // return để không chạy xuốn code dưới
   }
   //kiểm tra xem status của tài khoản có active không
   if (user.status == "inactive") {
      req.flash("error", "tài khoản đã bị khoá");
      res.redirect(req.get("referer"));
      return; // return để không chạy xuốn code dưới
   }
   res.cookie("token", user.token); //tạo cookie (lưu đc trên client và server)
   res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}


//get /admin/auth/logout
module.exports.logout = (req, res) => {

   //xoá token trong cookie
   res.clearCookie("token");
   res.redirect(`${systemConfig.prefixAdmin}/auth/login`);

}