const md5 = require('md5'); 
const Account = require("../../models/acccount_model");
const { prefixAdmin } = require('../../config/system');

//[get] /admin/my-account/
module.exports.index= async (req,res)=>{
    res.render("admin/pages/my-account/index",{
        pageTitle:"trang cá nhân",
    })
}
//[get] /admin/my-account/edit
module.exports.edit= async (req,res)=>{
    res.render("admin/pages/my-account/edit",{
        pageTitle:"Chỉnh sửa thông tin cá nhân",
    })
}
//[PATCH] /admin/my-account/edit
module.exports.editPatch= async (req,res)=>{
    const id = res.locals.user.id
    const emailExist = await Account.findOne({ //xác thực email đã dùng chưa    
        _id:{$ne:id}, // phải loại trường hợp email chính nó, 
        // ne viết tắt từ not equal, nếu không sẽ bị lặp email chính nó
        email:req.body.email,
        deleted:false
    })
    if(emailExist){ //nếu đã tồn tại email
        req.flash("error","email đã tồn tại");
       
    }
    else {
       if(req.body.password){
        req.body.password=md5(req.body.password) // mã hoá password
        }
        else {
            delete req.body.password;//nếu không điền thì delete phần key password trong body để không cập nhật

        }   
        await Account.updateOne({ _id:id}, req.body);
        req.flash("success","cập nhật thành công");
        
    }
    res.redirect(`${prefixAdmin}/my-account`);//khi submit trả về trang trước khi submit
}