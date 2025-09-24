module.exports.createPost = async (req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error",`Vui lòng nhập họ và tên`);
        res.redirect(req.get("referer"));
        return ;
    }
    if(!req.body.email){
        req.flash("error",`Vui lòng nhập email`);
        res.redirect(req.get("referer"));
        return ;
    }
    if(!req.body.password){
        req.flash("error",`Vui lòng nhập mật khẩu`);
        res.redirect(req.get("referer"));
        return ;
        
    }
    next();
}
module.exports.editPatch = async (req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error",`Vui lòng nhập họ và tên`);
        res.redirect(req.get("referer"));
        return ;
    }
    if(!req.body.email){
        req.flash("error",`Vui lòng nhập email`);
        res.redirect(req.get("referer"));
        return ;
    }
    
    next();
}