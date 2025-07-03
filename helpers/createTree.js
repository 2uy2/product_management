let count=0;
const createTree = (arr, parentId = "")=> {
    const tree = [];
    arr.forEach(item => {
        if (item.parent_id == parentId) {
            // console.log(item);
            count ++;
            const newItem = item;
            newItem.index=count;
            const children = createTree(arr, item.id);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
}

module.exports.tree = (arr, parentId = "") => {
    count =0;
    const tree = createTree(arr, parentId="");//phải tạo hàm tree 
    // vì module không cho gọi lại chính nó nếu chưa import
    return tree;
    
}