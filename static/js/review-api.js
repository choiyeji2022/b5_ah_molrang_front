console.log("review-api")

// 리뷰 페이지로 가기
function review_page(productId) {
    window.location.href = `${frontend_base_url}/templates/review_create.html?id_product=${productId}`;

}


// 리뷰 작성하기
async function postReview(productId) {

    let token = localStorage.getItem("access")
    console.log("access", token)
    console.log("response", response)


    const reviewTitle = document.querySelector("#review-title").value
    const reviewContent = document.querySelector("#review-content").value
    const reviewRating = document.querySelector('input[name="rating"]:checked').value;  // 선택된 별점 값 가져오기

    const formdata = new FormData();

    formdata.append("title", reviewTitle)
    formdata.append("content", reviewContent)
    formdata.append("rating", reviewRating); // 별점 값 추가

    const response = await fetch(`${backend_base_url}/products/${productId}/reviews/}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    }
    )

    if (response.status == 201) {
        alert("글작성 완료")
        window.location.replace(`${frontend_base_url}/templates/product-detail.html?id_product=${productId}`);
    } else {
        alert(response.status)
    }

}


window.onload = async function () {
    const urlParmas = new URLSearchParams(window.location.search);
    const productId = urlParmas.get('id_product');
    await loadReviews(productId);
}