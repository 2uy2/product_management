//cập nhật số lượng trong giỏ hàng
const  inputsQuantity = document.querySelectorAll("input[name='quantity']");
if (inputsQuantity){
    console.log("â")
    inputsQuantity.forEach(input=>{
        input.addEventListener("change",(e)=>{
            const productId = input.getAttribute("product-id");
            const quantity= input.value; //có thể sử dụng e.target.value
            
            if (quantity>0){
                window.location.href=`/cart/update/${productId}/${quantity}`;
            }
            
        })
    })
}
