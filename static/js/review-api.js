// 리뷰 페이지로 가기
function review_page(productId) {
    window.location.href = `${frontend_base_url}/templates/review_create.html?id_product=${productId}`;

}

// 리뷰 수정 페이지로 가기
async function updateReviewPage(productId, reviewId) {
    window.location.href = `${frontend_base_url}/templates/review_update.html?id_product=${productId}&id_review=${reviewId}`;
}



// 리뷰 수정하기
async function updateConfirm(productId, reviewId) {

    let token = localStorage.getItem("access")

    // 작성된 값 넣어주기
    const reviewTitle = document.getElementById("review-title").value
    const reviewContent = document.getElementById("review-content").value
    let reviewRating = document.querySelector('input[name="rating"]:checked')  // 선택된 별점 값 가져오기 querySelector로 넣어줘야 합니다.

    const form = new FormData();

    form.append("title", reviewTitle)
    form.append("content", reviewContent)
    form.append("rating", reviewRating.value); // 별점 값 추가 value의 값을 출력해야함


    const response = await fetch(`${backend_base_url}/products/${productId}/reviews/${reviewId}/`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({
            "title": reviewTitle,
            "content": reviewContent,
            "rating": reviewRating.value,
        }),
    });

    const response_json = await response.json();
    if (response.ok) {
        alert("리뷰가 수정되었습니다!");
        window.location.replace(`${frontend_base_url}/templates/product-detail.html?id_product=${productId}`);
    } else {
        alert(response_json);
    }
}


// 리뷰 삭제
async function deleteReview(productId, reviewId) {
    let token = localStorage.getItem("access")

    // confirm 메소드를 사용하여 확인 체크창을 띄움
    const confirmed = confirm("정말 삭제하시겠습니까?");
    if (!confirmed) {
        return;
    }

    const response = await fetch(`${backend_base_url}/products/${productId}/reviews/${reviewId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (response.ok) {
        alert("삭제되었습니다!");
        window.location.replace(`${frontend_base_url}/templates/product-detail.html?id_product=${productId}`);
    } else {
        const response_json = await response.json();
        alert(`오류가 발생했습니다: ${response_json}`);
    }
}