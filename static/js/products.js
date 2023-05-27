
// API 호출을 위한 기본 URL 설정
const baseURL = 'http://127.0.0.1:8000/';

// 토큰을 로컬 스토리지에서 가져옵니다.
const token = localStorage.getItem('token');

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': `Bearer ${token}`
    }
});



function productDetail(id_product) {
    window.location.href = `${frontend_base_url}/templates/product-detail.html?id_product=${id_product}`
}

// 장바구니에 상품을 추가하는 함수
async function addToCart(productname, event) {
    event.stopPropagation();
    try {
        // 장바구니에 상품 추가 API 호출
        const response = await api.post(`carts/`, {
            product: productname,
            quantity: 1,
        });
        console.log("장바구니에 상품을 추가했습니다:", response.data);
        alert("장바구니에 상품을 추가했습니다."); // Optional: Show a success message
    } catch (error) {
        console.error("장바구니에 상품을 추가하는데 실패했습니다:", error);
        alert("장바구니에 상품을 추가하는데 실패했습니다."); // Optional: Show an error message
    }
}

window.onload = async function localProducts() {
    try {
        const products = await getProducts();

        const product_list = document.getElementById("product-list");

        if (product_list) {
            products.forEach((product) => {
                const newCol = document.createElement("div");
                newCol.setAttribute("class", "col");

                const newCard = document.createElement("div");
                newCard.setAttribute("class", "card");
                newCard.setAttribute("id", product.id);
                newCard.addEventListener("click", () =>
                    productDetail(product.id)
                );

                newCol.append(newCard);

                const productImage = document.createElement("img");
                productImage.setAttribute("class", "card-img-top");

                if (product.image) {
                    productImage.setAttribute(
                        "src",
                        `${backend_base_url}${product.image}`
                    );
                } else {
                    productImage.setAttribute("src", "/static/img/baseimage.png");
                }

                newCard.appendChild(productImage);

                const newCardBody = document.createElement("div");
                newCardBody.setAttribute("class", "card-body");

                const productName = document.createElement("div");
                productName.setAttribute("class", "card-title product-name");
                productName.innerText = product.product;

                const inventoryStatus = document.createElement("p");
                inventoryStatus.setAttribute("class", "card-text");
                inventoryStatus.innerText = product.inventory_status;

                const price = document.createElement("p");
                price.setAttribute("class", "card-text");
                price.innerText = `₩${product.price}`;

                newCardBody.appendChild(productName);
                newCardBody.appendChild(inventoryStatus);
                newCardBody.appendChild(price);

                const addToCartButton = document.createElement("button");
                addToCartButton.setAttribute("class", "btn btn-primary");
                addToCartButton.innerText = "장바구니에 추가";
                addToCartButton.addEventListener("click", (event) =>
                    addToCart(product.product, event)
                );
                newCardBody.appendChild(addToCartButton);

                newCard.appendChild(newCardBody);

                product_list.appendChild(newCol);
            });
        } else {
            alert("product-list 요소를 찾을 수 없습니다.")
        }
    } catch (error) {
        alert("상품 목록을 가져오는 중 오류가 발생했습니다:", error)
    }
};
