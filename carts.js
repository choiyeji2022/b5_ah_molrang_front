// 상품 삭제
var removeButtons = document.querySelectorAll('.remove');
removeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var productId = this.dataset.productId;
        // 백엔드 API에 DELETE 요청 보내기
        axios.delete(`/api/cart-items/${productId}/`)
            .then(function (response) {
                // 삭제 성공한 경우 처리 로직
                var product = button.closest('.product');
                product.remove();
                calculateTotal();
            })
            .catch(function (error) {
                // 삭제 실패한 경우 처리 로직
                console.error(error);
            });
    });
});

// 수량 조절
var minusButtons = document.querySelectorAll('.qt-minus');
var plusButtons = document.querySelectorAll('.qt-plus');
var quantityElements = document.querySelectorAll('.qt');
var priceElements = document.querySelectorAll('.full-price');
var initialPrices = Array.from(priceElements, function (element) {
    return parseInt(element.textContent.replace(',', '').replace('원', '').trim());
});
var totalAmountElement = document.getElementById('totalAmount');

for (var i = 0; i < minusButtons.length; i++) {
    (function (index) {
        minusButtons[index].addEventListener('click', function () {
            var quantity = parseInt(quantityElements[index].textContent);
            if (quantity > 1) {
                quantityElements[index].textContent = quantity - 1;
                updatePrice(index);
                calculateTotal();
            }
        });

        plusButtons[index].addEventListener('click', function () {
            var quantity = parseInt(quantityElements[index].textContent);
            quantityElements[index].textContent = quantity + 1;
            updatePrice(index);
            calculateTotal();
        });
    })(i);
}

// 가격 업데이트
function updatePrice(index) {
    var quantity = parseInt(quantityElements[index].textContent);
    var price = initialPrices[index];
    var fullPrice = quantity * price;
    priceElements[index].textContent = fullPrice.toLocaleString() + '원';
}

// 총 합계 계산
function calculateTotal() {
    var priceElements = document.querySelectorAll('.full-price');
    var total = 0;
    priceElements.forEach(function (element) {
        var price = parseInt(element.textContent.replace(',', '').replace('원', '').trim());
        total += price;
    });
    totalAmountElement.textContent = total.toLocaleString() + '원';
}

// 초기 총 합계 계산
calculateTotal();
