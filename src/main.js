import { getProducts } from "./api.js";
import { filterProducts } from "./product.js";

const cardProducts = document.getElementById('card-products');
const state = document.getElementById('state');
const optionBrand = document.getElementById('brand');
const input = document.getElementById('input-search');
const sortStyle = document.getElementById('sort');
const openCart = document.getElementById('open-cart');
const listCart = document.getElementById('list-cart');

let products = [];

function handleFilter(){
    const inp = input.value.trim();
    const option = optionBrand.value;
    const sort = sortStyle.value;

    const result = filterProducts(products, inp, option, sort);
    if(result.length === 0){
        state.textContent = "Không tìm thấy sản phẩm!";
        cardProducts.innerHTML = ""
        return;
    }
    state.textContent = "";
    render(result);
}

async function getData() {
    try{
        state.textContent = "Đang lấy sản phẩm...";
        products = await getProducts();
        renderOption(products);
        handleFilter();
    }catch(error){
        console.log(error.message);
        state.textContent = error.message;
    }
    state.textContent = "";
}

function render(products){
    cardProducts.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product')

        const name = document.createElement('p');
        const brand = document.createElement('p');
        const img = document.createElement('img');
        const btnAddCart = document.createElement('button');
        const price = document.createElement('span')

        price.classList.add('price');
        img.classList.add('pic-product');
        btnAddCart.classList.add("add-cart");

        img.src = product.image;
        name.textContent = `${product.name} ${product.storage} ${product.cpu}`;
        brand.textContent = product.brand;
        price.textContent = `${product.price}đ`;
        btnAddCart.textContent = "Thêm vào rỏ";

        card.append(img, name, price, btnAddCart);
        card.dataset.id = product.id;

        cardProducts.appendChild(card);
    });
}

function renderOption(products){
    const brands = [...new Set(products.map(product => product.brand))];

    brands.forEach(brand => {
        const option = document.createElement('option');

        option.value = brand;
        option.textContent = brand;

        optionBrand.appendChild(option);
    })
}

function debounce(callback, delay){
    let timer = 0;

    return function(){
        clearTimeout(timer);

        setTimeout(() => {
            callback();
        }, delay)
    }
}
const handleInput = debounce(handleFilter, 300);

input.addEventListener('input', handleInput);
optionBrand.addEventListener('change', handleFilter);
sortStyle.addEventListener('change', handleFilter);

cardProducts.addEventListener('click', (event) => {
    if(event.target.classList.contains('add-cart')){
        console.log(event.target.parentElement);
    }
})
openCart.addEventListener('click', () => {
    if(listCart.style.display === "none") listCart.style.display === "block";
    if(listCart.style.display === "block") listCart.style.display === "none";
})
getData();