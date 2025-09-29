const ProductCategory = require("../models/product-category_model")
module.exports.getSubCategory = async (parentId) => {
    const getCategory = async (parentId) => {
        const subs = await ProductCategory.find({
            parent_id: parentId,
            status: "active",
            deleted: false
        });
        let allSub = [...subs]; //cú pháp có ý nghĩa tạo một 
        // mảng khác để chứa mảng này, dể không ảnh hưởng đến mảng đang có ,
        // ... là trải mảng ra
        for (const sub of subs) {
            const childs = await getCategory(sub.id); //đệ quy để tìm ra các subs,
            //  module export k gọi lại đc nên phải chỉnh lại
            allSub = allSub.concat(childs);
        }
        return allSub;
    }
    const result = await getCategory(parentId);//tạo biến để chứa giá trị hàm thực hiện
    return result;
}