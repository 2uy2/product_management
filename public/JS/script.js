
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
//button go back
const buttonGoBack = document.querySelectorAll("[button-go-back]");
if(buttonGoBack.length>0){
  buttonGoBack.forEach(button=>{
    button.addEventListener("click",()=>{
      history.back();
    })
  })
}
//end button go back