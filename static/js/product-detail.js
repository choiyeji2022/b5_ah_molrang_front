console.log("디테일연결")


window.onload = async function () {
    const urlParmas = new URLSearchParams(window.location.search);
    productId = urlParmas.get('id_product');

    const response = await getProduct(productId);

    const productImage = document.getElementById("product-image")
    const productName = document.getElementById("product-name")
    const productPrice = document.getElementById("product-price")
    const productQuantity = document.getElementById("product-status")
    const productContent = document.getElementById("product-content")

    const newImage = document.createElement("img")
    newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    newImage.setAttribute("class", "img-fluid")

    productImage.appendChild(newImage)
    productName.innerText = response.product
    productPrice.innerText = `₩${response.price}`
    productQuantity.innerText = response.inventory_status
    productContent.innerText = response.content

    // 수정버튼
    const updateButton = document.getElementById("update-btn")
    updateButton.setAttribute("onclick", `product_update_page(${productId})`)

    // 삭제버튼
    const deleteButton = document.getElementById("delete-btn")
    deleteButton.setAttribute("onclick", `deleteProduct(${productId})`)
}

// 상세페이지에서 찜 기능: 찜이 되어있으면 찜 취소, 안 되어있으면 찜 -> alert창으로 데이터 알려줌
async function addWish() {
    const urlParmas = new URLSearchParams(window.location.search);
    product_Id = urlParmas.get('id_product');

    const access_token = localStorage.getItem("access");
    console.log(access_token)

    const response = await fetch(`${backend_base_url}/products/${product_Id}/wish/`, {
        headers: {
            "Authorization": "Bearer " + access_token
        },
        method: "POST"
    })
    console.log(response)

    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)
    } else {
        alert("찜 추가에 실패했습니다")
    }

}