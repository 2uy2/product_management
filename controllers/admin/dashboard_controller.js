const ProductCategory = require("../../models/product-category_model")
const Product = require("../../models/product_model");
const Account = require("../../models/acccount_model")
const User = require("../../models/user_model")
//get /admin/dashboard
const systemConfig =  require("../../config/system");
module.exports.dashboard = async (req, res) => {
    //tạo ra bảng thống kê
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },

    }
    //product-category
    statistic.categoryProduct.total = await ProductCategory.countDocuments ({
        deleted:false
    });
    statistic.categoryProduct.active = await ProductCategory.countDocuments ({
        deleted:false,
        status:"active"
    });
    statistic.categoryProduct.inactive = await ProductCategory.countDocuments ({
        deleted:false,
        status:"inactive"
    });
    //product
    statistic.product.total = await Product.countDocuments ({
        deleted:false
    });
    statistic.product.active = await Product.countDocuments ({
        deleted:false,
        status:"active"
    });
    statistic.product.inactive = await Product.countDocuments ({
        deleted:false,
        status:"inactive"
    });
    //account
    statistic.account.total = await Account.countDocuments ({
        deleted:false
    });
    statistic.account.active = await Account.countDocuments ({
        deleted:false,
        status:"active"
    });
    statistic.account.inactive = await Account.countDocuments ({
        deleted:false,
        status:"inactive"
    });
    //user
    statistic.user.total = await User.countDocuments ({
        deleted:false
    });
    statistic.user.active = await User.countDocuments ({
        deleted:false,
        status:"active"
    });
    statistic.user.inactive = await User.countDocuments ({
        deleted:false,
        status:"inactive"
    });



    res.render("admin/pages/dashboard/index", {
        pageTitle: "trang tổng quang",
        prefitAdmin: systemConfig.prefixAdmin,
        statistic:statistic
    });
}