const SettingGeneral = require("../../models/settings-genelral_model");
const createTreeHelper = require("../../helpers/createTree");
module.exports.settingGeneral = async (req, res, next) => {

    if (
        req.url.startsWith("/js") ||
        req.url.startsWith("/css") ||
        req.url.startsWith("/images") ||
        req.url.startsWith("/.well-known")
    ) {
        return next();
    }

    const settinsGeneral = await SettingGeneral.findOne({});
    res.locals.settingGeneral = settinsGeneral


    next();
}