//get /admin/dashboard
const systemConfig = require("../../config/system");
module.exports.dashboard=(req, res) => {  
    res.render("admin/pages/dashboard/index",{
        pageTitle:"trang tổng quang",
        prefitAdmin :systemConfig.prefixAdmin
    });           
}