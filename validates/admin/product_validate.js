module.exports.createPost = async (req,res,next)=>{
    if(!req.body.title){
        req.flash("error",`Vui lòng nhập tiêu đề`);
        res.redirect(req.get("referer"));
        return ;//return fail để ngăn chặn thực hiện dòng code phía dưới
    }
    if(req.body.title.length<2){
        req.flash("error",`Vui lòng nhập ít nhất 2 kí tự`);
        res.redirect(req.get("referer"));
        return ;//return fail để ngăn chặn thực hiện dòng code phía dưới
    }
    console.log("ok");
    next();//sau khi kiểm tra xong thì phải dùng next() chuyển sang bước kế tiếp
    //nếu không sẽ không gửi về frontend để tiếp tục
} 
module.exports.editPatch = async (req,res,next)=>{
    if(!req.body.title){
        req.flash("error",`Vui lòng nhập tiêu đề`);
        res.redirect(req.get("referer"));
        return ;//return fail để ngăn chặn thực hiện dòng code phía dưới
    }
    if(req.body.title.length<2){
        req.flash("error",`Vui lòng nhập ít nhất 2 kí tự`);
        res.redirect(req.get("referer"));
        return ;//return fail để ngăn chặn thực hiện dòng code phía dưới
    }
    console.log("ok");
    next();//sau khi kiểm tra xong thì phải dùng next() chuyển sang bước kế tiếp
    //nếu không sẽ không gửi về frontend để tiếp tục
}     