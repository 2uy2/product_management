const User = require("../../models/user_model")

module.exports.requireAuth =async (req,res,next)=>{
    
    if(!req.cookies.tokenUser){
        res.redirect(`/user/login`);
        return;
    }
    //nếu có cookies thì kiểm tra xem token đó có hợp lệ không
    else{
        const user = await User.findOne({tokenUser:req.cookies.tokenUser}).select("-password");
        if(!user){
            res.redirect(`/user/login`);
            return;
        }
        
    }
    next();
   
    
}