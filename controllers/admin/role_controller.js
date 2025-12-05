const Role = require("../../models/role_model");
const systemConfig = require("../../config/system");
//get /admin/role
module.exports.index = async (req, res) => {  
    let find ={
        deleted : false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/index",{
        pageTitle:"trang nhóm quyền",
        prefitAdmin :systemConfig.prefixAdmin,
        records:records
        
    });           
}

//get /admin/role/create
module.exports.create = async (req, res) => {  
   
    res.render("admin/pages/roles/create",{
        pageTitle:"tạo nhóm quyền",
        prefitAdmin :systemConfig.prefixAdmin,
    });           
}

//post /admin/role/create
module.exports.createPost = async (req, res) => { 
    // console.log(req.body); 
    const record = new Role(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

//get /admin/role/edit/:id
module.exports.edit = async (req, res) => {  
    try {
        const id = req.params.id ;
        // console.log(id);
        let find = {
            _id:id,
            deleted: false 
        };
        const data = await Role.findOne(find);
        
        // console.log(data);
        res.render("admin/pages/roles/edit",{
            pageTitle:"sửa nhóm quyền",
            data: data
        });      
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

//patch /admin/role/edit/:id
module.exports.editPatch = async (req, res) => {  
   try {
    const id = req.params.id ;
    await Role.updateOne({_id:id},req.body);
   req.flash("success","cập nhật thành công");
   } catch (error) {
     req.flash("error", "cập nhật thất bại")
   }
   res.redirect("back");
  
}
//[get] admin/role/detail/:id
module.exports.detail = async(req,res)=>{
    try {
        const find={
            deleted:false,
            _id:req.params.id
        }
        const data = await Role.findOne(find); 
        // console.log(data);
        res.render("admin/pages/roles/detail", {
            pageTitle:data.title,
            data:data
        });
        
    }
    catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
};

//[delete]role/ delete-item
module.exports.deleteRole= async (req,res) =>{
    const id = req.params.id; // lấy ra id từ id đã tạo trong param
    await Role.updateOne({_id:id}, {
      deleted: true,
      updateAt: new Date() //cập nhật thời gian hiện tại
    });//xoá 1 item,update thêm thời gian thực khi đã xoá 
    req.flash("success",`Bạn đã xoá thành công 1 sản phẩm!`);
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}

//[get]role/ permissions
module.exports.permissions= async(req,res)=>{
    let find ={
        deleted:false,
    };
    const records = await Role.find(find);
    res.render("admin/pages/roles/permissions",{
        pageTitle: "Phân quyền",
        records:records
    })
}

//[Patch]role/ permissions
module.exports.permissionsPatch= async(req,res)=>{
   try {
    const permissions = JSON.parse(req.body.permissions);//lấy phần json của ô input có name là permissions để chuyển sang dạng object
    // console.log(permissions)
 
    for (const item of permissions) { // duyệt từng phần tử trong object
         
         await Role.updateOne({_id:item.id},{permissions:item.permissions});
 
    }
    req.flash("success","cập nhật thành công");
   } catch (error) {
    req.flash("error","cập nhật thất bại")
   }

   res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}