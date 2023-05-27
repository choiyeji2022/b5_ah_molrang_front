console.log("디테일연결")


async function loadReviews(productId) {
    const response = await getReviews(productId);
    const reviewList = document.getElementById("review-list")

    response.results.forEach((review, index) => {

        console.log("reviewList", reviewList)

        const rating = response.results[index].rating; // 별점 개수
        const stars = '<div class="star-rating">' + '★'.repeat(rating) + '☆'.repeat(5 - rating) + '</div>'; // 별 모양을 나타내는 문자열 생성

        reviewList.innerHTML += `
        <div class="review-box" >
            <div class="second-area" >
            <div>
                <div class="reviews-title">
                    <div style="margin : 0 40px;">
                        ${response.results[index].title}
                        <span class="stars">(${stars})</span>  <!-- 별점 출력 -->
                    </div>
                    <div style="margin : 0 40px;">
                        <span>작성자 : ${response.results[index].writer}</span>
                    </div>
                </div>
                <div class="review-content">
                    ${response.results[index].content}
                </div>
                <div style="color: darkgray; text-align: end;">
                    ${response.results[index].created_at}
                </div>
            </div>
            </div>
        </div>
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
    await getProduct(productId)
}