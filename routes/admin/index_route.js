const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth_middleware")

const dashboarRoute = require("./dashboard_route")
const productRoute = require("./product_route")
const productCategoryRoute = require("./product-category_router")
const roleRoute = require("./role_route")
const accountRoute = require("./account_route")
const authRoute = require("./auth_route")
const myAccountRoute = require("./my-account_route")



module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboarRoute);
    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRoute);
    app.use(PATH_ADMIN + "/products-category", authMiddleware.requireAuth, productCategoryRoute);
    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoute);
    app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoute);
    app.use(PATH_ADMIN + "/auth",  authRoute);
    app.use(PATH_ADMIN + "/my-account", authMiddleware.requireAuth, myAccountRoute);

};