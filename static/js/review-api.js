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

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    productId = urlParams.get('id_product');
    const response = await getProduct(productId);
    await getReviews(productId)
}