// 게시글 불러오기
async function getProducts() {
    const response = await fetch(`${backend_base_url}/products/`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}


// 게시글 생성
async function postProduct() {
    const product = document.getElementById("formGroupExampleInput").value
    const price = parseInt(document.getElementById("price_1").value)
    const total_quantity = document.getElementById("total").value
    const image = document.getElementById("formFile")
    const content = document.getElementById("exampleFormControlTextarea1").value
    console.log(typeof (price))

    const formData = new FormData();
    formData.append("price", parseInt(price));
    formData.append("product", product);
    formData.append("total_quantity", total_quantity);
    formData.append("image", image.files[0]);
    formData.append("content", content);

    for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }

    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/products/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    }
    )

    if (response.status == 201) {
        alert("글작성 완료")
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert(response.status)
    }

}

// 작성 취소
function cancel() {
    window.location.href = `${frontend_base_url}/index.html`;
}



// 상세 게시글 불러오기
async function getProduct(productId) {
    const response = await fetch(`${backend_base_url}/products/${productId}/`,
    )

    if (response.status == 200) {

        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


// 수정 페이지로 가기
function product_update_page(productId) {
    window.location.href = `${frontend_base_url}/templates/product-update.html?id_product=${productId}`;
}


// 수정하기
async function product_update(productId) {
    const product = document.querySelector(".product").value
    const price = document.querySelector(".price").value
    const total_quantity = document.querySelector(".total_quantity").value
    const image = document.querySelector(".image").files[0]
    const content = document.querySelector(".content").value

    const formdata = new FormData();
    formdata.append("product", product)
    formdata.append("price", price)
    formdata.append("total_quantity", total_quantity)
    formdata.append("image", image)
    formdata.append("content", content)

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/products/${productId}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })
    const response_json = await response.json()
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/templates/product-detail.html?id_product=${productId}`)
    } else {
        alert(response_json)
    }
}


// 삭제
async function deleteProduct(productId) {
    let token = localStorage.getItem("access")

    // confirm 메소드를 사용하여 확인 체크창을 띄움
    const confirmed = confirm("정말 삭제하시겠습니까?");
    if (!confirmed) {
        return;
    }

    const response = await fetch(`${backend_base_url}/products/${productId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (response.ok) {
        alert("삭제되었습니다!");
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        const response_json = await response.json();
        alert(`오류가 발생했습니다: ${response_json}`);
    }
}

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