// Access Token 값 불러오기
const access_token = localStorage.getItem("access");

// JWT 디코딩
const base64Url = access_token.split('.')[1];
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const decodedData = JSON.parse(atob(base64));


// 사용자의 ID 값을 추출하여 변수에 할당
const user_id = decodedData.user_id;


window.onload = async function loadProducts(){
    products = await getProducts()
    console.log(products)

    // const product_list = document.getElementById("product-list")
    // products.Array.forEach(product =>{
    //     const newCol = document.createElement("div");
    //     newCol.setAttribute("class","col")
    //     const newCard = document.createElement("div");
    //     newCard.setAttribute("class","card")
    //     newCard.setAttribute("id","product.pk")

    //     newCol.appendChild(newCard)

    //     product_list.appendChild(newCol)
    // })
}

async function getProducts() {
    const response = await fetch(`${backend_base_url}/users/${user_id}/`, {
        headers: {
            "Authorization": "Bearer" + localStorage.getItem("access")
        },
        method: "GET"
    })
    console.log(response)

    if(response.status==200){
        const response_json = await response.json()
        return response_json
    }else{
        alert("불러오는데 실패했습니다")
    }
}