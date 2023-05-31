// 리뷰 작성하기
async function reviewCreate() {
    params = new URLSearchParams(window.location.search);
    id_product = params.get("id_product") * 1;

    let token = localStorage.getItem("access")

    const reviewTitle = document.getElementById("review-title").value
    const reviewContent = document.getElementById("review-content").value
    const reviewRating = document.querySelector('input[name="rating"]:checked')  // 선택된 별점 값 가져오기 querySelector로 넣어줘야 합니다.

    const form = new FormData();

    form.append("title", reviewTitle)
    form.append("content", reviewContent)
    form.append("rating", reviewRating.value); // 별점 값 추가 value의 값을 출력해야함

    const response = await fetch(`${backend_base_url}/products/${id_product}/reviews/`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({
            "title": reviewTitle,
            "content": reviewContent,
            "rating": reviewRating.value
        })
    });

    const response_json = await response.json()
    if (response.status == 201) {
        alert("리뷰가 작성되었습니다!")
        window.location.replace(`${frontend_base_url}/templates/product-detail.html?id_product=${id_product}`)
    } else {
        alert(response_json)
    }
}

// 리뷰 작성 취소하기
function reviewCancel() {
    params = new URLSearchParams(window.location.search);
    id_product = params.get("id_product") * 1;

    window.location.href = `${frontend_base_url}/templates/product-detail.html?id_product=${id_product}`;
}