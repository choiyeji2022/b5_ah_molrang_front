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