const systemConfig = require("../../config/system");
const Account = require("../../models/acccount_model");
const Role = require("../../models/role_model");
const md5 = require('md5');

//get /admin/accounts
module.exports.index = async (req, res) => {  
    let find ={
        deleted : false
    }
    const records = await Account.find(find).select("-password-token"); // chỉ lấy ra những thông tin tài khoản, 
    // không lấy password token để tránh lộ thông tin

    for (const record of records) {
        const role = await Role.findOne({
            deleted:false,
            _id:record.role_id//lọc role_id là phần phân quyền
        });
        record.role = role //add thêm data role vào phần data account
        
    }
    res.render("admin/pages/accounts/index", {
        
        records:records,
        pageTitle:"Danh sách tài khoản"
    } )
}
//get /admin/accounts/create
module.exports.create = async (req, res) => {  
    const roles = await Role.find({
            deleted:false
        });
    res.render("admin/pages/accounts/create",{
        roles:roles,
        pageTitle:"tạo mới tài khoản",
       
    }) 
}
//post /admin/accounts/create
module.exports.createPost = async (req, res) => { 
     
    const emailExist = await Account.findOne({ //xác thực email đã dùng chưa    
        email:req.body.email,
        deleted:false
    })
    console.log(emailExist) // ỉn ra nếu có
    if(emailExist){ //nếu đã tồn tại email
        req.flash("error","email đã tồn tại");
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
    else {
        req.body.password =md5(req.body.password) ;// mã hoá string của mật khẩu
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
    
}
//get /admin/accounts/edit/:id
module.exports.edit = async (req, res) => { 
    let find ={
        deleted:false,
        _id:req.params.id
    }
    try {
        const data = await Account.findOne(find);
        const roles = await Role.find({
            deleted:false
        });
        res.render("admin/pages/accounts/edit",{
            pageTitle:"Chỉnh sửa tài khoản",
            data:data,
            roles:roles
        })
       
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    }
}
//patch /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => { 
    const id = req.params.id
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
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}