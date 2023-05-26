console.log("연결")

function productDetail(id_product) {
    window.location.href = `${front_base_url}/templates/product-detail.html?id_product=${id_product}`
}


window.onload = async function localProducts() {
    products = await getProducts()
    console.log(products)

    const product_list = document.getElementById("product-list")


    if (product_list) {
        products.forEach(product => {
            const newCol = document.createElement("div");
            newCol.setAttribute("class", "col")
            newCol.setAttribute("onclick", `productDetail(${product.id})`)

            const newCard = document.createElement("div")
            newCard.setAttribute("class", "card")
            newCard.setAttribute("id", "product.id")

            newCol.append(newCard)

            const productImage = document.createElement("img")
            productImage.setAttribute("class", "card-img-top")

            if (product.image) {
                productImage.setAttribute("src", `${backend_base_url}${product.image}`)
            } else {
                productImage.setAttribute("src", '/static/img/baseimage.png')
            }


            newCard.appendChild(productImage)



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

            newCard.appendChild(newCardBody);


            const newCardTitle = document.createElement("h5")
            newCardTitle.setAttribute("class", "card-title")
            newCardBody.appendChild(newCardTitle)

            product_list.appendChild(newCol)
        });
    } else {
        console.log("product-list 요소를 찾을 수 없습니다.");
    }

}
