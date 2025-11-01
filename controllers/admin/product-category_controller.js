const ProductCategory = require("../../models/product-category_model")
const systemConfig = require("../../config/system");
const filterStatusHelpers= require ("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require ("../../helpers/paganiton");
const createTreeHelper = require("../../helpers/createTree");

// get /admin/products-category
module.exports.index= async (req, res) => {  
    let find = {
        deleted: false
    };
    //đoạn bộ lọc
    const filterStatus = filterStatusHelpers(req.query);

    // lọc khi nào dùng đến key req.query
    if (req.query.status){
        find.status = req.query.status;
    }
    // lọc tìm kiếm keyword search
    const objectSearch = searchHelpers(req.query);
    // console.log(objectSearch);
    if (objectSearch.regex){
        find.title = objectSearch.regex  
    }
    //end search
   
   //pagination
   const countProducts = await ProductCategory.countDocuments(find); // đếm số lượng object dữ liệu được gọi đến
    let objectPagination = paginationHelpers(
        {
            currentPage :1, // truyền object
            limitItems:4
        },
        req.query,
        countProducts
    );
    //end pagination
    //sort//
   let sort={};
   if(req.query.sortKey && req.query.sortValue){ // kiểm tra xem trên url 
   // có trả về hai param đó không
        sort[req.query.sortKey]= req.query.sortValue;
   }
   else{
        sort.position="desc";//nếu như chưa click thì mặc đinh là xếp theo position
   }
   //end sort//

  

   
    // console.log(records);
    

    let records = await ProductCategory.find(find)
    
    const newrecords = createTreeHelper.tree(records)
    // records= await ProductCategory.find(find) // hàm xuất dữ liệu ra
    // .sort(sort)
    // .limit(objectPagination.limitItems)
    // .skip(objectPagination.skip);
    res.render("admin/pages/products-category/index",{
        pageTitle:"danh much sản phẩmmmm",
        records: newrecords,
        filterStatus:filterStatus,
        keyword:objectSearch.keyword,
        // pagination:objectPagination
    });
}

//[patch]product-category/change-status/:a/:id', status và id là tên biến của hai chấm
// với những hàm sau /product sẽ kế thừa lại frontend của cha nó nếu không dùng thêm render
module.exports.changeStatus= async (req, res) => {  
    const status = req.params.status;
    const id = req.params.id;
   
    await ProductCategory.updateOne({_id :id},{status:status});//update một sản phẩm dùng lênnhj updateOne
    // tham số 1: địa chỉ sản phẩm cần update, tham số hai trường update, gán param vào các trường dữ liệu cần thay đổi
    req.flash("success","Bạn đã cập nhật trạng thái thành công!");// gọi hàm flash ra để sử dụng
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}
//[patch]product-category/change-multi- status
module.exports.changeMulti= async (req, res) => {  
    //lấy req đã submit của một form
//    console.log(req.body);//req.body dựa trên các value và name trong ô form-group của 1 form 
// sau khi gửi đến server qua phương thức khác
            // giả sử trong input có giá trị name là tên biến, còn giá trị của value là giá trị của biến, 
            // các biến được chia nhau thành từng form-group để tránh nhầm lẫn
    const type = req.body.type;
    const ids = req.body.ids.split(", ");//đổi thành dạng mảng
    switch (type) {
        case "active":
            await ProductCategory.updateMany({_id: { $in: ids}},{status:"active"});
            req.flash("success",`Bạn đã cập nhật trạng thái thành công ${ids.length} sản phẩm!`); //TỪ ID sản phẩm được gọi 
            //                                                                  ta gọi hàm length
            break;
        case "inactive":
            await ProductCategory.updateMany({_id: { $in: ids}},{status:"inactive"});
            req.flash("success",`Bạn đã cập nhật trạng thái thành công ${ids.length} sản phẩm!`);    
            break;
        case "delete-all":
            await ProductCategory.updateMany({_id: { $in: ids}},{
          deleted: true,
          deletedAt: new Date()
        })
        req.flash("success",`Bạn đã xoá thành công ${ids.length}sản phẩm!`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id,position] = item.split("-");
                position= parseInt(position);//ép thành kiểu number
                await ProductCategory.updateOne({ _id : id }, {
                    position:  position
                });//tận dụng vòng lặp for để update từng sản phẩm
            }
            req.flash("success",`Bạn đãthay đổi vị trí thành công ${ids.length}sản phẩm!`);
            break;
        default:
            break;
    }
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}
//[delete]product-category/ delete-item
module.exports.deleteItem= async (req,res) =>{
    const id = req.params.id; // lấy ra id từ id đã tạo trong param
    await ProductCategory.updateOne({_id :id}, {
      deleted: true,
      deletedAt: new Date() //cập nhật thời gian hiện tại
    });//xoá 1 item,update thêm thời gian thực khi đã xoá 
    req.flash("success",`Bạn đã xoá thành công 1 sản phẩm!`);
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}

// get /admin/products-category/create
module.exports.create= async (req, res) => {  
    let find = {
        deleted: false

    }

    const records = await ProductCategory.find(find);
    // console.log(records);
    const newrecords = createTreeHelper.tree(records)
    // console.log(newrecords);
    res.render("admin/pages/products-category/create",{
        
        pageTitle:"tạo danh mục",
        records:newrecords
        
    });
}
//[post] admin/products-category/create
module.exports.createPost = async (req, res) => {
    const permissions = res.locals.role.permissions;
    if(permissions.includes("products-category_create")){
        // console.log("có quyền");
    }
    else {
        return ; // return để kết thúc hàm 
    }
    if (req.body.position==""){
        const count= await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }    
    const records = new ProductCategory(req.body);
    await records.save();
    req.flash("success",`Bạn đã thêm mới danh mục thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    
}
//END [post] admin/products/create
 
//[get] admin/products-category/product-category-edit/:id
module.exports.edit = async(req,res)=>{
    try {
        // console.log(req.params.id);
        const find = {
            deleted:false,
            _id:req.params.id
        };
        const records = await ProductCategory.findOne(find);//vì chỉ cần một object(một) 
        // chứ k phải là một bản ghi(nhiều) nên dùng findOne()
        // console.log(records);//data của category cần tìm
        const dataBase = await ProductCategory.find({
            deleted:false
        });
    // console.log(records);
    const newrecords = createTreeHelper.tree(dataBase) // danh sách cây

        res.render("admin/pages/products-category/edit", {
            pageTitle:"chỉnh sửa sản phẩm",
            record: records,
            data:newrecords
        });
    } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
};
//[PATCH] admin/products-category/edit/:id
module.exports.editPatch = async(req,res)=>{

    // if(req.file){//check có gửi ảnh thì mới gán nó vào
    //     req.body.thumbnail= `/uploads/${req.file.filename}`;// truyền giá trị của file ảnh vào cho body thumbnail 
    // //tạo mới sản phẩm thì truyền object vào product
    // // thay object đó bằng object của body đã  gửi trước đó
    // }
   try {
        await ProductCategory.updateOne({_id:req.params.id},req.body);//tham số đầu để xác định item, tham số số hai là dữ liệu update
        await req.flash("success","cập nhật thành công")
    } catch (error) {
        
        await req.flash("error","cập nhật thất bại")
   }
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

//[get] admin/products-category/product-category-detail/:id
module.exports.detail = async(req,res)=>{
    try {
        const find={
            deleted:false,
            _id:req.params.id
        }
        const record = await ProductCategory.findOne(find); 
        let test =0;
        if(record.parent_id){
            var find22={
                deleted:false,
                _id:record.parent_id
            }
            test ++;
        }
        const record2 = await ProductCategory.findOne(find22); 
        
        // console.log(record);
        res.render("admin/pages/products-category/detail", {
            pageTitle:record.title,
            record:record,
            record2:record2
        });
        
    }
    catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
};