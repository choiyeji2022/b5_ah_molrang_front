console.log("디테일연결")

// 리뷰들 불러오기
async function loadReviews(productId) {
    params = new URLSearchParams(window.location.search);
    // reviewId = params.get("id_review") * 1;
    const response = await getReviews(productId);
    const reviewList = document.getElementById("review-list")


    response.results.forEach((review, index) => {
        const reviewId = response.results[index].id
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
                <div class="gray-font">
                    ${response.results[index].created_at}
                </div>
                <div text-align: end;>
                    <button type="button" class="btn gray-btn" onclick="updateReviewPage(${productId},${reviewId})">수정</button>
                    <button type="button" class="btn gray-btn" onclick="deleteReview(${productId},${reviewId})">삭제</button>
                </div>
            </div>
            </div>
        </div>
        `

    })
}


// 상품들 불러오기
async function loadProducts(productId) {
    const response = await getProduct(productId);

    const productImage = document.getElementById("product-image")
    const productName = document.getElementById("product-name")
    const productPrice = document.getElementById("product-price")
    const productQuantity = document.getElementById("product-status")
    const productContent = document.getElementById("product-content")


    if (response.image) {
        const image = document.createElement("img")
        image.setAttribute("src", `${backend_base_url}${response.image}`)
        image.setAttribute("class", "img-fluid")
        productImage.appendChild(image)
    } else {
        // 이미지가 없을 경우 기본 이미지 출력
        const defaultImage = document.createElement("img")
        defaultImage.setAttribute("src", "/static/img/baseimage.png")
        defaultImage.setAttribute("class", "img-fluid")
        productImage.appendChild(defaultImage)
    }

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
        alert(response_json)
    } else {
        alert("찜 추가에 실패했습니다")
    }

}