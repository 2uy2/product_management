

// delete role
const buttonDelete = document.querySelectorAll("[button-delete]");// thuộc tính tự thêm thì cho vào ngoặc vuông
if (buttonDelete.length>0){
    const formDeleteItem = document.querySelector("#form-delete-role");
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

//permissions//
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions){
    const buttonSubmit = document.querySelector("[button-submit]");

    buttonSubmit.addEventListener("click",()=>{
        let permissions = [

        ]
        const rows = tablePermissions.querySelectorAll("[data-name]");
        rows.forEach(row =>{
            const name =row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(name =="id"){
                inputs.forEach(input =>{
                    const id =input.value;
                    permissions.push({ // thêm phần tử vào mảng 
                        id:id,
                        permissions:[]
                    });
                })
            }
            else {
                inputs.forEach((input,index) =>{
                    const checked = input.checked;
                  
                    if(checked){
                         permissions[index].permissions.push(name);//chọn thứ tự trong mảng permissions để thêm vào object
                    }                  
                })
            }
        });
        // console.log(permissions);
        if (permissions.length>0){
            const formChangePermissions = document.querySelector("#form-change-permissions");
            
            const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
            inputPermissions.value= JSON.stringify(permissions); 
            //vì inputPermissions hiện tại đang là object nên phải chuyển từ object sang string (string)
            formChangePermissions.submit();
        }
    });
}
//end permisssions//

//permissions data default//
const dataRecords = document.querySelector("[data-records]");
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));//chuyển sang dạng string (thành dạng mảng)
    const tablePermissions = document.querySelector("[table-permissions]");
    console.log(records)

    records.forEach( (record,index) => {
        const permissions = record.permissions;

        permissions.forEach(permission=>{
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            
            input.checked=true;
            
        })
        // console.log(permissions)
    });
}

//end perrmisions data default//