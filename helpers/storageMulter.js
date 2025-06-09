const multer = require('multer') //multer để load file...
module.exports=()=>{
    const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //lựa chọn thư mục sử dụng
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    //tạo đuôi cho file
    const uniqueSuffix = Date.now()
    cb(null,`${uniqueSuffix}-${file.originalname}`)
  }
})
    return storage
}