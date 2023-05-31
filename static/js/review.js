console.log("review.js")

// 리뷰 읽어오기
async function getReviews(productId) {
    const response = await fetch(`${backend_base_url}/products/${productId}/reviews/`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


// 수정페이지 작성되어 있던 데이터 불러오기
window.onload = async function () {
    params = new URLSearchParams(window.location.search);
    const productId = params.get("id_product");
    const reviewId = params.get("id_review");
    const get_response = await getReviews(productId);
    console.log(get_response);



    for (let index = 0; index < get_response.results.length; index++) {

        const review = get_response.results[index]; // 리뷰
        const response = await fetch(`${backend_base_url}/products/${productId}/reviews/`);
        let token = localStorage.getItem("access");

        // url id_review와 댓글의 id가 같을 때
        if (review.id == reviewId) {
            // 작성된 값 넣어주기
            const reviewTitle = document.getElementById("review-title");
            const reviewContent = document.getElementById("review-content");
            let reviewRatingElement = document.querySelector('input[name="rating"]:checked');//input 태그 name="rating" 중에서 checked 상태인 것만
            let reviewRating = reviewRatingElement ? parseInt(reviewRatingElement.value) : review.rating;

            reviewTitle.value = review.title;
            console.log("title", reviewTitle.value)
            reviewContent.value = review.content;
            console.log("content", reviewContent.value)
            reviewRating = review.rating  // integer 필드 리뷰의 평점이 값이 할당됨
            console.log("rating", reviewRating)


            const form = new FormData();

            form.append("title", reviewTitle.value);
            form.append("content", reviewContent.value);
            form.append("rating", parseInt(reviewRating));  // reviewRating을 정수로 변환 후 append 해야함

            // 별점 표시
            const star = document.querySelectorAll('input[name="rating"]');
            // 5개의 input(=별)들을 순회하기 위해 for문
            star.forEach((element) => {
                if (parseInt(element.value) == reviewRating) {  // 순회중인 별점과 reviewRating의 값이 같다면
                    element.checked = true; // 그 인풋의 체크를 ture로 
                }
            });
        }

        // 수정 완료 버튼
        const updateButton = document.getElementById("review-confirm");
        updateButton.setAttribute("onclick", `updateConfirm(${productId},${reviewId})`);
    };

}