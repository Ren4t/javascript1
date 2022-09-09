'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

const cartIcon = document.querySelector('.cartIcon');
const cartWindow = document.querySelector('.cart_window');
const featured = document.querySelector('.featured');
const cartTitleConteiner = document.querySelector('.cart_title_conteiner');

const cartTotalPrice = document.querySelector('.cart_total_price');
const counterProducts = document.querySelector('.counter_products');

let cartArray = [];

const products = [
    {
        productName: 'product0',
        price: 35.99
    },
    {
        productName: 'product1',
        price: 18.99
    },
    {
        productName: 'product2',
        price: 241.99
    },
    {
        productName: 'product3',
        price: 49.49
    },
    {
        productName: 'product4',
        price: 116.99
    },
    {
        productName: 'product5',
        price: 57.49
    },
];
// объект продукт для разметки корзины
class ProductCart {
    constructor(productTitle){
        this.title = productTitle;
        this.count = 1;
        this.price = this.getPrice();
        this.total = this.price;
    }

    getPrice(){
        for(let product of products){

            if(product.productName === this.title){
                return product.price;
            }
        }
    }
}

//заполнение страницы названием продукта и ценой
let i = 0;
document.querySelectorAll('.featuredData')
.forEach(element => {
    element.querySelector('.featuredName')
    .textContent = `${products[i].productName}`;
    element.querySelector('.featuredPrice')
    .textContent = `$${products[i].price}`;
    i++;
});

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

cartIcon.addEventListener('mouseover', () => {
    cartWindow.style.display = 'flex';
});

cartIcon.addEventListener('mouseout', () => {
    cartWindow.style.display = 'none';
});

//добавляет product в массив cartArray 
function addToCart(prodName){
    if(cartArray.length === 0){ // создается первый объект
        cartArray.push(new ProductCart(prodName));
        return;
    }
    let find = false; // флаг указывает на наличие объекта 
    for(let elementCart of cartArray){
        if(elementCart.title === prodName){
            elementCart.count = elementCart.count + 1;
            elementCart.total = +(elementCart.price * elementCart.count).toFixed(2);
            find = true;
        }
    }
    if(!find){ // если объекта нет
        cartArray.push(new ProductCart(prodName));
    }
};
// создается разметка для корзины
function markupCart(){
    let markup='';
    for(let elementCart of cartArray){
        markup = markup + `<div class="cart_title_box">
        <p class="cart_title_row product_title">${elementCart.title}</p>
        <p class="cart_title_row product_count">${elementCart.count}</p>
        <p class="cart_title_row product_price">${elementCart.price}</p>
        <p class="cart_title_row product_total_price">${elementCart.total}</p>
    </div> `;
    }
    return markup;
}
// создается разметка и высчитывается итоговая цена для всех продуктов
function markupCartTotalPrice(){
    let total = 0;
    for(let elementCart of cartArray){
        total = total + elementCart.total;
    }
    return `<p>Товаров в корзине на сумму: ${total.toFixed(2)}</p>`;
}
// создается разметка и высчитывается количество всех продуктов(цифра в кружке)
function calculateCounterProducts(){
    let count = 0;
    for(let elementCart of cartArray){
        count = count + elementCart.count;
    }
    return `${count}`;
}
//слушатель для кнопки "добавить в корзину"
let prodName = '';
featured.addEventListener('click', event => {
    if(!event.target.classList.contains('button_add_to_cart')){
        return;
    }
    // чтобы найти название продукта который связан именно с этой кнопкой)))
    // ничего другого не придумал
    prodName = event.path[3].querySelector('.featuredName').textContent;
    addToCart(prodName);
    cartTitleConteiner.innerHTML = markupCart();
    cartTotalPrice.innerHTML = markupCartTotalPrice();
    counterProducts.textContent = calculateCounterProducts();
});