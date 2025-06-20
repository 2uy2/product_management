const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
// End cloudinary

module.exports.upload = (req, res, next) => {
    if (req.file) {
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
          // console.log(result.secure_url);
        //gán giá trị cho thumnail bằng cloud đã gửi
      req.body[req.file.fieldname] = result.secure_url//lấy ra name file đã gửi, 
        // tăng tính linh động khi gọi tên
      
      next();
    }
    upload(req);
    } 
    else {
        next();
    }
}