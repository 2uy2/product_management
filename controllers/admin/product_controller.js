
const Product = require("../../models/product_model")
const systemConfig = require("../../config/system");
const filterStatusHelpers= require ("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelpers = require ("../../helpers/paganiton");
const createTreeHelper = require("../../helpers/createTree");
const ProductCategory = require("../../models/product-category_model")
const Account = require("../../models/acccount_model")


// get /admin/products
module.exports.index= async (req, res) => {  
    // console.log(req.query.status);// truy vấn từ hàm req vào hàm query 
    // rồi tới biến status sử dụng cho phương thức get
    
    //search
    let find = {
        deleted: false
    };
    //đoạn bộ lọc
    const filterStatus = filterStatusHelpers(req.query);

    // lọc khi nào dùng đến key req.query
    if (req.query.status){
        find.status = req.query.status;
    }
    // lọc tìm kiếm keyword
    const objectSearch = searchHelpers(req.query);
    // console.log(objectSearch);
    if (objectSearch.regex){
        find.title = objectSearch.regex;
    }
    //end search
   
   //pagination
   const countProducts = await Product.countDocuments(find); // đếm số lượng object dữ liệu được gọi đến
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

    const products = await Product.find(find) // hàm xuất dữ liệu ra
    .sort(sort)
    .limit(objectPagination.limitItems)//hàm limit dùng để giới hạn dữ liệu được gọi ra
    .skip(objectPagination.skip); // hàm skip dùng để qua những object đầu trong dữ liệu để lấy trang muốn tìm
    //   end pagination 
    // end get products

   for (const product of products) {
        //lấy ra thông tin người tạo
        const user = await Account.findOne({
            _id:product.createdBy.account_id
        });
        if(user){
            product.accountFullName=user.fullName ;//  thêm thuộc tính vào product   
        }
        //lấy ra thông tin người cập nhật gần nhất
        const updatedBy=product.updatedBy[product.updatedBy.length-1];
        if(updatedBy){
            const userUpdated = await Account.findOne({
            _id:updatedBy.account_id
        });

        updatedBy.accountFullName= userUpdated.fullName;
        }
        
        
   }  
    res.render("admin/pages/products/index",{
        prefixAdmin :systemConfig.prefixAdmin,
        pageTitle:"danh sách sản phẩmmmm",
        products:products,
        filterStatus:filterStatus,
        keyword:objectSearch.keyword,
        pagination:objectPagination
    });    
}
//end get admin/products

//[patch]/change-status/:a/:id', status và id là tên biến của hai chấm
// với những hàm sau /product sẽ kế thừa lại frontend của cha nó nếu không dùng thêm render
module.exports.changeStatus= async (req, res) => {  
    const status = req.params.status;
    const id = req.params.id;
    const updatedBy={
        account_id:res.locals.user.id,
        updatedAt: new Date(),
    }

    await Product.updateOne({_id :id},{
        $push:{updatedBy:updatedBy},
        status:status});//update một sản phẩm dùng lênnhj updateOne
    // tham số 1: địa chỉ sản phẩm cần update, tham số hai trường update, gán param vào các trường dữ liệu cần thay đổi
    req.flash("success","Bạn đã cập nhật trạng thái thành công!");// gọi hàm flash ra để sử dụng
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}
//[patch]/change-multi- status
module.exports.changeMulti= async (req, res) => {  
    //lấy req đã submit của một form
//    console.log(req.body);//req.body dựa trên các value và name trong ô form-group của 1 form 
// sau khi gửi đến server qua phương thức khác
            // giả sử trong input có giá trị name là tên biến, còn giá trị của value là giá trị của biến, 
            // các biến được chia nhau thành từng form-group để tránh nhầm lẫn
    const type = req.body.type;
    const ids = req.body.ids.split(", ");//đổi thành dạng mảng
    const updatedBy={
        account_id:res.locals.user.id,
        updatedAt: new Date(),
    }
    switch (type) {
        case "active":
            await Product.updateMany({_id: { $in: ids}},{
                status:"active",
                $push:{updatedBy:updatedBy},
            });
            req.flash("success",`Bạn đã cập nhật trạng thái thành công ${ids.length} sản phẩm!`); //TỪ ID sản phẩm được gọi 
            //                                                                  ta gọi hàm length
            break;
        case "inactive":
            await Product.updateMany({_id: { $in: ids}},{status:"inactive",
                $push:{updatedBy:updatedBy},});
            req.flash("success",`Bạn đã cập nhật trạng thái thành công ${ids.length} sản phẩm!`);    
            break;
        case "delete-all":
            await Product.updateMany({_id: { $in: ids}},{
            deleted: true,
        //   deletedAt: new Date()
            deletedBy:{
                account_id:res.locals.user.id,
                deletedAt:new Date(),
            }  ,
            $push:{updatedBy:updatedBy},
        })
        req.flash("success",`Bạn đã xoá thành công ${ids.length}sản phẩm!`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id,position] = item.split("-");
                position= parseInt(position);//ép thành kiểu number
                
                await Product.updateOne({ _id : id }, {
                    position:  position,
                    $push:{updatedBy:updatedBy},
                });//tận dụng vòng lặp for để update từng sản phẩm
            }
            req.flash("success",`Bạn đãthay đổi vị trí thành công ${ids.length}sản phẩm!`);
            break;
        default:
            break;
    }
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}
//[delete] delete-item
module.exports.deleteItem= async (req,res) =>{
    const id = req.params.id; // lấy ra id từ id đã tạo trong param
    await Product.updateOne({_id :id}, {
      deleted: true,
    //   deletedAt: new Date() //cập nhật thời gian hiện tại
    deletedBy:{
        account_id:res.locals.user.id,
        deletedAt:new Date()
    }
    });//xoá 1 item,update thêm thời gian thực khi đã xoá 
    req.flash("success",`Bạn đã xoá thành công 1 sản phẩm!`);
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}

//[get] admin/products/create
//tạo giao diện để thêm mới một sản phẩm nên dùng phương thức get
module.exports.create = async(req,res)=>{
    let find = {
        deleted: false

    }

    const category = await ProductCategory.find(find);
    
    const newCategory = createTreeHelper.tree(category)

    res.render("admin/pages/products/create",{
        pageTitle:"danh sách sản phẩmmmm",
        category: newCategory
    });    
}
// end [get] admin/products/create

//[post] admin/products/create
module.exports.createPost = async (req, res) => {
    
    // console.log(req.file)  lấy ra file đã gửi
    req.body.price = parseInt(req.body.price);//tìm đến biến có name là price, khi submit để thêm
    //  thì dùng phương thức post
    req.body.discountPercentage= parseInt(req.body.discountPercentage);//gán lại và ép kiểu number
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position==""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }    
    req.body.createdBy= {
        account_id:res.locals.user.id// lấy ra phần local.user đã tạo trong phần middleware auth

    }
    //xử lí up ảnh onl bên router
    //khi upload ảnh trên local 
    // if(req.file){//check có gửi ảnh thì mới gán nó vào
    //     req.body.thumbnail= `/uploads/${req.file.filename}`;// truyền giá trị của file ảnh vào cho body thumbnail 
    // //tạo mới sản phẩm thì truyền object vào product
    // // thay object đó bằng object của body đã  gửi trước đó
    // }
    const product = new Product(req.body);
    await product.save(); 
    // lưu sản phẩm, tự đông kết nối đến trường dữ liệu thích hợp
    res.redirect(`${systemConfig.prefixAdmin}/products`);
    req.flash("success",`Bạn đã cập nhật trạng thái thành công`);
}
//END [post] admin/products/create

//[get] admin/products/edit/:id
module.exports.edit = async(req,res)=>{
    try {
        // console.log(req.params.id);
        const find = {
            deleted:false,
            _id:req.params.id
        };
        const product= await Product.findOne(find);//vì chỉ cần một object(một) 
        // chứ k phải là một bản ghi(nhiều) nên dùng findOne()
        

    const category = await ProductCategory.find({
        deleted:false
    });
    
    const newCategory = createTreeHelper.tree(category)
        res.render("admin/pages/products/edit", {
            pageTitle:"chỉnh sửa sản phẩm",
            product: product,
            category:newCategory
        });
    } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};
//[PATCH] admin/products/edit/:id
module.exports.editPatch = async(req,res)=>{
    req.body.price = parseInt(req.body.price);//tìm đến biến có name là price, khi submit để thêm
    //  thì dùng phương thức post
    req.body.discountPercentage= parseInt(req.body.discountPercentage);//gán lại và ép kiểu number
    req.body.stock = parseInt(req.body.stock);
   
    // if(req.file){//check có gửi ảnh thì mới gán nó vào
    //     req.body.thumbnail= `/uploads/${req.file.filename}`;// truyền giá trị của file ảnh vào cho body thumbnail 
    // //tạo mới sản phẩm thì truyền object vào product
    // // thay object đó bằng object của body đã  gửi trước đó
    // }
    req.body.position= parseInt(req.body.position);
    // if(req.file){
    //     req.body.thumbnail = `/upload/${req.file.filename}`;
    // }
   try {
        const updatedBy={
            account_id:res.locals.user.id,
            updatedAt: new Date(),
        }
        
        await Product.updateOne({_id:req.params.id},{
            ...req.body,
            $push:{updatedBy:updatedBy}//sử dụng hàm push trên mongo để khỏi bị ghi đè file
        });//tham số đầu để xác định item, tham số số hai là dữ liệu update
        req.flash("success","cập nhật thành công")
    } catch (error) {
        
         req.flash("error","cập nhật thất bại")
   }
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}
//[get] admin/products/detail/:id
module.exports.detail = async(req,res)=>{
    try {
        const find={
            deleted:false,
            _id:req.params.id
        }
        const product = await Product.findOne(find); 
        // console.log(product);
        res.render("admin/pages/products/detail", {
            pageTitle:product.title,
            product:product
        });
        
    }
    catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};