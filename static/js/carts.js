// Access Token 값 불러오기
const access_token = localStorage.getItem("access");

// payload 값 가져오기 -> name, user_id 가능!
const payload = localStorage.getItem('payload');
const payload_parse = JSON.parse(payload);
const user = JSON.parse(payload)['user_id'];
console.log(payload_parse);

// 사용자의 ID 값을 추출하여 변수에 할당
const user_id = user;

// API 객체 생성
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
});

// 총 합계를 저장할 변수
let totalAmount = 0;

// 총합계를 계산하는 함수
function calculateTotalAmount() {
    const quantityElements = document.querySelectorAll('.qt');
    console.log(quantityElements)
    const priceElements = document.querySelectorAll('.price');
    console.log(priceElements)
    let total = 0;

    for (let i = 0; i < quantityElements.length; i++) {
        const quantity = parseInt(quantityElements[i].textContent.trim(), 10);
        const priceText = priceElements[i].textContent.trim();
        const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
        total += quantity * price;
    }
    // 페이지에 총합계를 업데이트합니다.
    const totalAmountElement = document.getElementById('total-price');
    totalAmountElement.textContent = `총합계: ${total}원`;

    // 전역 변수 totalAmount를 업데이트합니다.
    totalAmount = total;
}

// 장바구니 목록을 가져와서 화면에 표시하는 함수
async function getCartItems() {
    try {
        // 장바구니 목록 API 호출
        const response = await api.get("/carts/");
        const cartItems = response.data;

        // 장바구니 목록을 화면에 표시
        const cartContainer = document.querySelector(".cart-items");
        cartContainer.innerHTML = ""; // 기존 내용 초기화

        cartItems.forEach((cartItem) => {
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");

            // 장바구니 아이템의 정보를 표시
            const imageSrc = `${window.location.origin}${cartItem.image}`;

            cartItemElement.innerHTML = `
        <div class="product-info">
          <img class="product-image" src="${imageSrc}" alt="${cartItem.product.product}" width="200">
          <div class="product-details">
            <h4>${cartItem.product.product}</h4>
            <p>${cartItem.product.content}</p>
            <p class="price">${cartItem.product.price}원</p>
            <p>${cartItem.product.inventory_status}</p>
            <p>작성자: ${cartItem.product.writer}</p>
          </div>
        </div>
  
        <div class="quantity">
          <span class="qt-minus">-</span>
          <span class="qt">${cartItem.quantity}</span>
          <span class="qt-plus">+</span>
        </div>
  
        <div class="checkbox">
          <input type="checkbox" class="item-checkbox">
        </div>
  
        <div class="remove">
          <button class="remove-btn">제거</button>
        </div>`;


            cartContainer.appendChild(cartItemElement);

            // 상품 제거 버튼 이벤트 핸들러 추가
            const removeBtn = cartItemElement.querySelector(".remove-btn");
            removeBtn.addEventListener("click", () => {
                removeCartItem(cartItem.id);
            });

            // 수량 조절 이벤트 처리
            const quantityContainer = cartItemElement.querySelector(".quantity");
            const quantityMinusBtn = quantityContainer.querySelector(".qt-minus");
            const quantityPlusBtn = quantityContainer.querySelector(".qt-plus");
            const quantityText = quantityContainer.querySelector(".qt");

            quantityMinusBtn.addEventListener("click", () => {
                if (cartItem.quantity > 1) {
                    cartItem.quantity--;
                    quantityText.textContent = cartItem.quantity;
                    calculateTotalAmount();
                }
            });

            quantityPlusBtn.addEventListener("click", () => {
                cartItem.quantity++;
                quantityText.textContent = cartItem.quantity;
                calculateTotalAmount();
            });
        });

        // 총합계 요청 및 표시 함수 호출
        displayTotalPrice();
    } catch (error) {
        console.error('장바구니 목록을 가져오는데 실패했습니다:', error);
    }
}

// 총합계를 요청하여 표시하는 함수
async function displayTotalPrice() {
    try {
        // 총합계 API 호출
        const response = await api.get('carts/total-price/');
        const total = response.data.total_price;
        console.log(response.data); // API 응답 확인
        // 총합계를 HTML 요소에 표시
        document.getElementById('total-price').textContent = `총합계: ${total}원`;
    } catch (error) {
        console.error('총합계를 가져오는데 실패했습니다:', error);
    }
}


// 상품 제거 함수
async function removeCartItem(cartItemId) {
    try {
        // 장바구니 상품 제거 API 호출
        await api.delete(`carts/items/${cartItemId}`);

        // 장바구니 목록 갱신
        getCartItems();
    } catch (error) {
        console.error('장바구니 상품을 제거하는데 실패했습니다:', error);
    }
}


// 페이지 로드 시 장바구니 목록을 가져옵니다.
window.addEventListener('load', getCartItems);

