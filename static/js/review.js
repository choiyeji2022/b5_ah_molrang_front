console.log("리뷰 연결")

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

window.onload = async function () {
    const urlParmas = new URLSearchParams(window.location.search);
    const productId = urlParmas.get('id_product');
    await loadReviews(productId);
}