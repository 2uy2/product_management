//change-status
const buttonChangeStatus = document.querySelectorAll(`[button-change-status]`);
if (buttonChangeStatus.length>0){
    const formChangeStatus = document.querySelector(`#form-change-status`);
    const path =formChangeStatus.getAttribute("data-path");
    // console.log(formChangeStatus);
    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            const statusCurrent= button.getAttribute("data-status");
            const id= button.getAttribute("data-id");
            let statusChange = statusCurrent == "active" ? "inactive" : "active";//toán tử ba ngôi
            // console.log(statusCurrent);
            // console.log(statusChange);
            const action = path+`/${statusChange}/${id}?_method=PATCH`;
            console.log(action);
            formChangeStatus.action=action;
            formChangeStatus.setAttribute("action",`${action}`);
            formChangeStatus.submit();
        });
    });
};
//end change status
// delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length>0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path =formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button =>{
        //xét từng nút delete phần tử nào đã được click
        button.addEventListener("click", ()=>{
            const isConfirm = confirm("bạn có muốn xoá không")
            if (isConfirm){
                const id = button.getAttribute("data-id");
                // console.log(id);
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.setAttribute('action',`${action}`);
                // console.log(action)
                formDeleteItem.submit();
            }
        })
    })
}
// end delete item