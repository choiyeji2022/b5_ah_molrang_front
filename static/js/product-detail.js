console.log("디테일연결")


async function loadReviews(productId) {
    const response = await getReviews(productId);
    console.log("response=", response)

    console.log("title", response.results[0].title)

    const reviewList = document.getElementById("review-list")

    response.results.forEach((review, index) => {
        // const reviewTitle = document.querySelectorAll(".review-title")[index]
        // const reviewStar = document.querySelectorAll(".review-star")[index]
        // const reviewWriter = document.querySelectorAll(".review-writer")[index]
        // const reviewDate = document.querySelectorAll(".review-date")[index]

        // reviewTitle.innerText = review.title
        // reviewStar.innerText = review.star_rating
        // reviewWriter.innerText = review.writer
        // reviewDate.innerText = review.created_at
        console.log("reviewList", reviewList)
        reviewList.innerHTML += `
            <tr>
                <td class="tit">
                    <a href="#" class="review-title">${response.results[index].title}</a>
                </td>
                <td class="review-star">${response.results[index].star}</td>
                <td class="review-writer">${response.results[index].writer}</td>
                <td class="review-date">${response.results[index].created_at}</td>
            </tr>
        `
    })
}


async function loadProducts(productId) {
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

    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    // 어드민만 수정, 삭제 버튼 보이게 설정
    if (!payload || payload_parse.is_admin !== true) {
        updateButton.style.display = "none";
        deleteButton.style.display = "none";
    }

    // 리뷰 작성하러 가기 버튼
    const reviewButton = document.getElementById("review-btn")
    reviewButton.setAttribute("onclick", `review_page(${productId})`)
}



window.onload = async function () {
    const urlParmas = new URLSearchParams(window.location.search);
    const productId = urlParmas.get('id_product');
    await loadProducts(productId);
    await loadReviews(productId);
}