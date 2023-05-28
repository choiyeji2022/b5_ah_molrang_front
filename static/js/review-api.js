
// 리뷰 페이지로 가기
function review_page(productId) {
    window.location.href = `${frontend_base_url}/templates/review_create.html?id_product=${productId}`;

}

// 리뷰 수정 페이지로 가기
async function updateReviewPage(productId, reviewId) {
    window.location.href = `${frontend_base_url}/templates/review_update.html?id_product=${productId}&id_review=${reviewId}`;
}
