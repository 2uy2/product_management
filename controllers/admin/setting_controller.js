const SettingGeneral = require("../../models/settings-genelral_model")

//get /admin/settings/general
module.exports.general=async(req,res)=>{
    const settingGeneral = await SettingGeneral.findOne({});//luôn luôn lấy ra bản ghi đầu tiên
    //chỉ cần lấy ra bản ghi cập nhật mới nhất
    res.render("admin/pages/settings/general",{
        pageTitle:"Cài đặt chung",
        settingGeneral:settingGeneral
    })
}
//patch /admin/settings/general
module.exports.generalPatch=async(req,res)=>{
    const settingGeneral = await SettingGeneral.findOne({});
    if(settingGeneral){
        await SettingGeneral.updateOne({
            _id:settingGeneral.id
        },
            req.body,
        )
    }
    else {
        // console.log(req.body);
        const record = new SettingGeneral(req.body);
        await record.save();
    }
    
    req.flash("success","cập nhật thành công")
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}