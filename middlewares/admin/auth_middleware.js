const systemConfig = require("../../config/system");
const Account= require("../../models/acccount_model");
const Role= require("../../models/role_model");
module.exports.requireAuth =async (req,res,next)=>{
    
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    //nếu có cookies thì kiểm tra xem token đó có hợp lệ không
    else{
        const user = await Account.findOne({token:req.cookies.token}).select("-password");
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }
        else{
            const role = await Role.findOne({
                _id:user.role_id
            })
            res.locals.user = user; // tạo một biến local,
            res.locals.role =role;

            next();
        }
    }
    
}