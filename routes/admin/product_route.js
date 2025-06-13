const express = require("express")
const multer = require('multer') //multer để load file...
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const router = express.Router();
// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({storage:storageMulter()}); //upload sử dụng cho multer,
//  và khi upload sử dụng hàm trong storageMulter
//  dest là đường dẫn chuyền vào thư mục upload
// đường dẫn mặc định(static) là public,nhưng chỉ áp dụng cho file pug,

//cloudianry
cloudinary.config({ 
  cloud_name: 'dnw0atqag', 
  api_key: '796714845385617', 
  api_secret: 'Q0CbkpKMEQ79rAWKjfWtskejlJ0'
});
//end cloudinary
const upload = multer();

const controller = require("../../controllers/admin/product_controller");
const validate = require("../../validates/admin/product_validate");

router.get('/', controller.index); //từ hàm controller ta sử dụng hàm index
router.patch("/change-status/:status/:id", controller.changeStatus); //hai chấm để truyền data động
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem); //hai chấm để truyền data động

//route có thể giống nhau nhưng phương thưucws là khác nhau, 
// get dể sinh ra giao diện để thêm sản phẩm, post là phương thức để thêm mới một sản phẩm
router.get('/create', controller.create); //get là phương thức để gọi trang
//router phương thức post khi submit create post
router.post(
    `/create`,
    upload.single('thumbnail'),
    function (req, res, next) {
        if (req.file){
            let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            //gán giá trị cho thumnail bằng cloud đã gửi
            req.body[req.file.fielname] = result.secure_url//lấy ra name file đã gửi, 
            // tăng tính linh động khi gọi tên
            next();  
           
        }

        upload(req);
        }
        
        else{
            next();
        }
    },
    validate.createPost, //middleware , hàm trung gian kiểm tra thảo mãn không,
    //  nếu có thì next tiếp
    controller.createPost); //post phương thức để thêm item

//edit item
router.get('/edit/:id', controller.edit);
router.patch(
    "/edit/:id",
    upload.single('thumbnail'), //gửi ảnh đơn(single) có trường là thumnail
    validate.editPatch,
    controller.editPatch);

//detail item
router.get('/detail/:id', controller.detail);
module.exports = router;