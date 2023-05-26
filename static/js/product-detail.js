console.log("디테일연결")

window.onload = async function () {
    const urlParmas = new URLSearchParams(window.location.search);
    const productId = urlParmas.get('id_product');

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
    productPrice.innerText = response.price
    productQuantity.innerText = response.inventory_status
    productContent.innerText = response.content

    // // 게시글 수정 버튼 생성해서 추가
    // const buttonContainer = document.getElementById("update-delete-button-container");
    // const updateButton = createUpdateButton(productId);
    // buttonContainer.appendChild(updateButton);

    // // 게시글 삭제 버튼 생성해서 추가
    // const deleteButton = createDeleteButton(productId);
    // buttonContainer.appendChild(deleteButton);

}