module.exports = (query) =>{ // phải truyền tham số có giá là req.query
//                   vì bên file này không có req.query dể gọi
    let filterStatus = [
        {
            name:"tất cả",
            status:"",
            class:""
        },
        {
            name:"hoạt động",
            status:"active",
            class:""
        },
        {
            name:"không hoạt động",
            status:"inactive",
            class:""
        }
    ];
    //gán class vào button khi param, tính năng thêm class vào bộ lọc 
    if (query.status) {
        const index = filterStatus.findIndex(item => item.status == query.status)
        //so sánh trạng thái để xác định vị trí
        filterStatus[index].class = "active";
      } 
    else {
        filterStatus[0].class = "active";
    }
    return filterStatus;//khi gọi hàm sẽ cho ra biến kết quả
}