// Access Token 값 불러오기
const access_token = localStorage.getItem("access");

// payload 값 가져오기 -> name, user_id 가능!
const payload = localStorage.getItem('payload')
const payload_parse = JSON.parse(payload)
const user = JSON.parse(payload)['user_id']
console.log(payload_parse)

// 사용자의 ID 값을 추출하여 변수에 할당
const user_id = user

if (payload) {
    console.log("is_admin", payload_parse.is_admin)

    // 어드민일 경우 제품 리스트 보이게 하기
    if (payload_parse.is_admin) {
        window.onload = async function loadProducts() {
            await getProducts()
            await getWishes()
            await getReviews()
        }
    } else {
        window.onload = async function loadProducts() {
            $('#admin-show').empty()
            await getWishes()
            await getReviews()
        }
        
    }
}


async function getProducts() {
    const response = await fetch(`${backend_base_url}/users/${user_id}/product/`, {
        headers: {
            "Authorization": "Bearer" + localStorage.getItem("access")
        },
        method: "GET"
    })
    if (response.status == 200) {
        const response_json = await response.json()
        $('#product-list').empty()
        response_json['product_set'].forEach(a => {
            const product_id = a['id']
            const image = a['image']
            const price = a['price']
            const product = a['product']
            const total_quantity = a['total_quantity']
            const writer = a['writer']
            console.log(product_id, price, product, total_quantity, writer, image)

            

            let temp_html2 = `    
                            <div class="col w-75 mx-auto">
                                <div class="card h-100">
                                    <img src="${backend_base_url}${image}" class="card-img-top w-25 h-50" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${product}</h5>
                                        <p class="card-text">${price}원</p>
                                        <p class="card-text">남은 수량: ${total_quantity}개</p>
                                    </div>
                                </div>
                            </div>
                        `;
            $('#product-list').append(temp_html2);

        })
    } else {
        alert("제품리스트를 불러오는데 실패했습니다")
    }

}

async function getWishes() {
    const response = await fetch(`${backend_base_url}/users/${user_id}/wish/`, {
        headers: {
            "Authorization": "Bearer" + localStorage.getItem("access")
        },
        method: "GET"
    })
    if (response.status == 200) {
        const response_json = await response.json()
        $('#wish-list').empty()
        console.log(response_json)
        response_json['wishes'].forEach(a => {
            const w_image = a['image']
            const w_price = a['price']
            const w_product = a['product']
            const w_writer = a['writer']
            console.log(w_image, w_price, w_product, w_writer)

            

            let temp_html2 = `    
                            <div class="col w-75 mx-auto">
                                <div class="card h-100">
                                    <img src="${backend_base_url}${w_image}" class="card-img-top w-25 h-50" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${w_product}</h5>
                                        <p class="card-text">${w_price}원</p>
                                        <p class="card-text">${w_writer}</p>
                                    </div>
                                </div>
                            </div>
                        `;
            $('#wish-list').append(temp_html2);

        })
    } else {
        alert("위시리스트를 불러오는데 실패했습니다")
    }

}

async function getReviews() {
    const response = await fetch(`${backend_base_url}/users/${user_id}/review/`, {
        headers: {
            "Authorization": "Bearer" + localStorage.getItem("access")
        },
        method: "GET"
    })
    if (response.status == 200) {
        const response_json = await response.json()
        $('#review-list').empty()
        console.log(response_json)
        response_json['review_set'].forEach(a => {
            const r_prodcut_id = a['product']
            const r_title= a['title']
            const r_content = a['content']
            const r_writer = a['writer']
            console.log(r_prodcut_id, r_content, r_title, r_writer)

            

            let temp_html2 = `    
                            <div class="col w-75 mx-auto">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <p class="card-text">${r_prodcut_id}</p>
                                        <h5 class="card-title">${r_title}</h5>
                                        <p class="card-text">${r_content}</p>
                                        <p class="card-text">${r_writer}</p>
                                    </div>
                                </div>
                            </div>
                        `;
            $('#review-list').append(temp_html2);

        })
    } else {
        alert("위시리스트를 불러오는데 실패했습니다")
    }

}
