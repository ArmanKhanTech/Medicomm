let proId = null;

const productName = document.querySelector('.product-brand');
const shortLine = document.querySelector('.product-short-des');
const des = document.querySelector('.des');

const seller = document.querySelector('.sold-by');
const use = document.querySelector('.use');

const actualPrice = document.querySelector('.product-actual-price');
const discountPercentage = document.querySelector('.product-discount');
const sellingPrice = document.querySelector('.product-price');

const img1 = document.querySelector('.image');
const img2 = document.querySelector('#img1');
const img3 = document.querySelector('#img2');
const img4 = document.querySelector('#img3');

var link1s = "";
var link2s = "";
var link3s = "";
var link4s = "";
var sell = '';

const fetchSellerName = (data) => {
    fetch('/get-seller', {
        method: 'post',
        headers: new Headers ({'Content-Type': 'application/json'}),
        body: JSON.stringify({email: data.email})
    }).then((res) => res.json()).then(data => {
        sell = data.name;
        seller.textContent = sell;
    })
}

const setFromsData = (data) => {
    productName.textContent = data.name;
    shortLine.textContent = data.shortDes;
    des.innerHTML = data.des;
    link1s = data.image1;
    link2s = data.image2;
    link3s = data.image3;
    link4s = data.image4;

    showImg();
    
    fetchSellerName(data);

    use.textContent = data.use;
    actualPrice.textContent = data.actualPrice;
    sellingPrice.textContent = data.sellPrice;
    discountPercentage.textContent = data.discount;

    const quanValue = document.querySelector('#quantity');

    const addCartBtn = document.querySelector('.cart-btn');
    const addWishlistBtn = document.querySelector('.wish-btn');

    addCartBtn.addEventListener('click', () => {
        addCartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', data, quanValue.value, sell);
    })

    addWishlistBtn.addEventListener('click', () => {
        addWishlistBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', data, quanValue.value, sell);
    })
}

const fetchProductData = () => {
    fetch('/get-product', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({id: proId})
    }).then((res) => res.json())
    .then(data => {
        setFromsData(data);
        getProducts2(data.cate).then(data => createProductCards(data, '.product'))
    }).catch(err => {
        location.replace('/404');
    })
}

const showImg = () => {
    img1.src = link1s;
    img2.src = link2s;
    img3.src = link3s;
    img4.src = link4s;
}

if(location.pathname != '/product'){
    proId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}

const getProducts2 = (cate) => {
    return fetch('/get-products', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({cate: cate})
    }).then(res => res.json())
    .then(data => {
        return data;
    })
}

const createProductCards = (data, parent) => {
    const p = document.querySelector(parent);

    let start = '<div class="product-container3">';
    let middle = '';
    let end = '</div>';

    for(let i = 0; i < data.length; i++)
    {
        middle += `
        <div class="product-card">
            <div class="product-image">
                <span class="discount-tag">${data[i].discount}</span>
                <img src="${data[i].image1}" class="product-thumb" alt="">
                <button class="card-btn">add to wishlist</button>
            </div>
            <div class="product-info">
                <a href="/product/${data[i].id}" class="product-brand">${data[i].name}</a>
                <p class="product-short-des">${data[i].shortDes}</p>
                <p class="Usage">${data[i].use}</p>
                <span class="price">${data[i].sellPrice}</span>
                <span class="actual-price">${data[i].actualPrice}</span>
            </div>
        </div>`;
    }

    p.innerHTML = start + middle + end;
}
