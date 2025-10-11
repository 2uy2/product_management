const User = require("../../models/user_model")
module.exports.infoUser=async (req,res,next)=>{
    if (
        req.url.startsWith("/js") || 
        req.url.startsWith("/css") || 
        req.url.startsWith("/images") ||
        req.url.startsWith("/.well-known")
    ) {
        return next();
    }
    if(req.cookies.tokenUser){
        const user = await User.findOne({
            tokenUser:req.cookies.tokenUser,
            deleted:false,
        }).select("-password")
        if(user){
            res.locals.user = user
        }
    }

    next(); 
}