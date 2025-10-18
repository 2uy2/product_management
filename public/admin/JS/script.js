// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonsStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      }
      else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    })
  })
}
// End Button Status

// Form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href); // trả về url hiện tại của trang web
  
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    //bắt dữ liệu của input trong form sau khi submit form
    const keyword = e.target.elements.keyword.value;// tìm trong form bắt sự kiện , trong element, trong name là keyword lấy ra giá trị thuộc tính là value
    // và có  giá trị là của thuộc tính value

    if (keyword) {
      url.searchParams.set("keyword", keyword);//thiết lập hoặc cập nhật giá trị của tham số truy vấn
      //  có tên "keyword" trong URL thành giá trị của biến keyword.
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End from search

// PaginationAdd commentMore actions
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
  let url = new URL(window.location.href);
  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      console.log(page)
      url.searchParams.set("page", page);
      window.location.href = url.href;
    })
  })
}
// End pagination

// Checkbox multi
const checkboxMuli = document.querySelector("[checkbox-multi]");
if (checkboxMuli) {
  const inputCheckAll = checkboxMuli.querySelector("input[name='checkall']");
  const inputsCheck = checkboxMuli.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsCheck.forEach(input => {
        input.checked = true;
      })
    } else {
      inputsCheck.forEach(input => {
        input.checked = false;
      })
    }
  })

  inputsCheck.forEach(input => {
    input.addEventListener("click", () => {
      const coutChecked = checkboxMuli.querySelectorAll("input[name='id']:checked").length;
      if (coutChecked === inputsCheck.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    })
  })
}


// End Checkbox multi

// from change submit
const fromChangeMulti = document.querySelector("[form-change-multi]");
if (fromChangeMulti) {
  fromChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    // bắt dữ liệu của input trong form-group trong form sau khi submit
    const checkboxMuli = document.querySelector("[checkbox-multi]");//bắt form-group
    const inputsChecked = checkboxMuli.querySelectorAll("input[name='id']:checked");

    const typeChange = e.target.elements.type.value; //  tìm trong form bắt sự kiện , trong element, trong name là keyword lấy ra giá trị thuộc tính là value
    // type và lấy thuộc tính value là giá trị
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn chắc chắc muốn xoá?");
      if (!isConfirm) {
        return;
      }
    }
    if (inputsChecked.length > 0) {
      let ids = [];
      const inputsId = fromChangeMulti.querySelector("input[name='ids']");
      inputsChecked.forEach(input => {
        const id = input.value;
        if (typeChange === "change-position") {
          //từ ô input đã được check ta tìm kiếm input position
          const position = input
            .closest("tr")//lùi lại một lớp
            .querySelector("input[name='position']").value;
            ids.push(`${id}-${position}`)
            
        } else {
          ids.push(id);
        }
      })
      inputsId.value = ids.join(", ");//đổi thành dạng mảng

      fromChangeMulti.submit();
    } else {
      alert("Choose one record");
    }
  })
}
//end change form submit

//show alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert){
  const time = parseInt(showAlert.getAttribute("data-time"));// lấy  time aleert và 
  // đổi kiểu string thành kiểu number
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click",()=>{//set sự kiện đê đóng alert
    showAlert.classList.add("alert-hidden");
  })
  setTimeout(()=>{
    showAlert.classList.add("alert-hidden");//thêm class ẩn alert sau 5s
  },time)
}
//end show alert
//upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage){
  const buttonClose = uploadImage.querySelector("[button-close-image]");
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change",(e) => {
    console.log(e);
    const file = e.target.files[0];
    if(file){
      uploadImagePreview.src=URL.createObjectURL(file);//set src cho image,
       // gán giá trị ảnh từ input vào ô image
    }
    console.log(uploadImageInput.value);
    if(uploadImageInput.value){
    buttonClose.setAttribute("class","btn btn-primary");
    }
  });
  buttonClose.addEventListener("click",()=>{
    uploadImageInput.value="";
    uploadImagePreview.src="";
    buttonClose.setAttribute("class","d-none");
  })
}
//end upload image

//sort
const sort = document.querySelector("[sort]");//kiểm tra xem có thuộc tính sort không
if (sort){
  let url = new URL(window.location.href);
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  sortSelect.addEventListener("change",(e)=>{
    const value = e.target.value;
    const [sortKey,sortValue] = value.split("-");
    console.log(sortKey);
    console.log(sortValue);
    url.searchParams.set("sortKey",sortKey);//tạo và gán vào params
    url.searchParams.set("sortValue",sortValue);
    window.location.href = url.href; //Nó chuyển (redirect) trình duyệt sang một địa chỉ URL mới, 
    // cụ thể là giá trị url.href.
  })
  //xoá sắp xếp
  sortClear.addEventListener("click",(e)=>{
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  });
//end xoá sắp xếp
//thêm selected cho option
  const sortKey = url.searchParams.get("sortKey");//lấy giá trị từu param
  const sortValue = url.searchParams.get("sortValue");//lấy giá trị từu param
  if (sortKey && sortValue){
    const stringSort = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`);
    optionSelected.setAttribute("selected","true");
  }
}
//end sort
