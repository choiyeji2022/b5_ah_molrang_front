const backend_base_url = "http://127.0.0.1:8000";
const front_base_url = "http://127.0.0.1:5500";

// 사용자의 권한 확인 함수
function checkUserPermission() {
    const isAdmin = localStorage.getItem("is_admin");

    // 권한이 없는 경우 처리
    if (isAdmin !== "true") {
        // 다른 페이지로 리디렉션 또는 접근 거부 메시지 표시
        alert("접근할 수 없는 페이지입니다.");
        window.location.href = `${front_base_url}/index.html`; // 리디렉션할 URL
    }
}


// 페이지 로드 시 사용자 권한 확인 수행
window.onload = function () {
    checkUserPermission();
    localProducts();
};


function checkSigninPost() {
    const payload = localStorage.getItem("payload");
    const isAdmin = localStorage.getItem("is_admin");
    const postButton = document.getElementById("post-btn");

    if (!payload || isAdmin !== "true") {
        postButton.style.display = "none";
    }
}



// 게시글 불러오기
async function getProducts() {
    const response = await fetch(`${backend_base_url}/products/`)
    console.log(response.status)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}

// 게시글 생성
async function postProduct() {
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
    console.log("액세스", token)
    const response = await fetch(`${backend_base_url}/products/`, {
        method: "POST",
        headers: {
            // 임시로 토큰 박아놨습니다! 나중에 수정 예정!
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2MjAxNTAyLCJpYXQiOjE2ODQ5OTE5MDIsImp0aSI6ImVlYWMxNzdjMDIyYzRiY2Q5NDIyNGE1M2U1MzU1ZThlIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.jXuqHN55OGKbiN0UeMNXJPphjO6_dthMiGk5gn822RA"
        },
        body: formdata
    }
    )

    if (response.status == 201) {
        alert("글작성 완료")
        window.location.replace(`${front_base_url}/index.html`);
    } else {
        alert(response.status)
    }

}

// 작성 취소
function cancel() {
    window.location.href = `${front_base_url}/index.html`;
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

// 게시글 수정
async function updateProduct(productId, updatedData) {
    const response = await fetch(`${backend_base_url}/products/${productId}/`, {
        method: "PUT",
        headers: {
            // 임시로 토큰 박아놨습니다! 나중에 수정 예정!
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2MjAxNTAyLCJpYXQiOjE2ODQ5OTE5MDIsImp0aSI6ImVlYWMxNzdjMDIyYzRiY2Q5NDIyNGE1M2U1MzU1ZThlIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.jXuqHN55OGKbiN0UeMNXJPphjO6_dthMiGk5gn822RA"
        },
        body: JSON.stringify(updatedData)
    });

    if (response.status == 200) {
        alert("게시글이 수정되었습니다.");
        // 수정된 게시글의 상세 페이지로 이동하거나 필요한 처리 수행
    } else {
        alert("게시글 수정에 실패했습니다.");
    }
}

// 게시글 삭제
async function deleteProduct(productId) {
    console.log(productId)
    const response = await fetch(`${backend_base_url}/products/${productId}/`, {
        method: "DELETE",
        headers: {
            // 임시로 토큰 박아놨습니다! 나중에 수정 예정!
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg2MjIyOTYxLCJpYXQiOjE2ODUwMTMzNjEsImp0aSI6IjlkMmU5MTUyNTczZTQ5OTFhYmE4NTEwNTExNmQ4Njk1IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.h57LG2J7FGwa4f5R10HgBpxHTU-3B1gZCZdtz5W-EAg"
        },
    });

    if (response.status == 204) {
        alert("게시글이 삭제되었습니다.");
        // 게시글 목록 페이지로 이동하거나 필요한 처리 수행
    } else {
        alert("게시글 삭제에 실패했습니다.");
    }
}
