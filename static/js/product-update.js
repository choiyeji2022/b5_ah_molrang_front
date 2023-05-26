console.log('수정')
window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    productId = urlParams.get('id_product');
    const response = await getProduct(productId);  // 상세페이지 불러오는 함수를 담아줌


    //작성된 값 넣어주기
    const productName = document.querySelector(".product")
    const productPrice = document.querySelector(".price")
    const productQuantity = document.querySelector(".total_quantity")
    const productContent = document.querySelector(".content")

    productName.value = response.product
    productPrice.value = response.price
    productQuantity.value = response.total_quantity
    productContent.value = response.content

    const updateconfirmButton = document.getElementById("update-btn")
    updateconfirmButton.setAttribute("onclick", `product_update(${productId})`)


}