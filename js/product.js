let proId = null;
let loader = document.querySelector('.loader');

const productName = document.querySelector('.product-brand');
const shortLine = document.querySelector('.product-short-desc');
const desc = document.querySelector('.desc');

const seller = document.querySelector('.sold-by');
const use = document.querySelector('.use');

const actualPrice = document.querySelector('.product-actual-price');
const discountPercentage = document.querySelector('.product-discount');
const sellingPrice = document.querySelector('.product-price');

const exDate = document.querySelector('.expiry-date');
const manuDate = document.querySelector('.man-date');
const perscription = document.querySelector('.per-ans');
const stock = document.querySelector('.stock-ans');

const userPincode = document.querySelector('.check-box');
const pinBtn = document.querySelector('.check-btn');
const pinAns = document.querySelector('.pin-ans1');

let sellerPincode = '';

const img1 = document.querySelector('.image');
const img2 = document.querySelector('#img1');
const img3 = document.querySelector('#img2');
const img4 = document.querySelector('#img3');

var link1s = "";
var link2s = "";
var link3s = "";
var link4s = "";
var sell = '';
var sellerPin = '';

const fetchSellerName = (data) => {
    fetch('/get-seller', {
        method: 'post',
        headers: new Headers ({'Content-Type': 'application/json'}),
        body: JSON.stringify({email: data.email})
    }).then((res) => res.json()).then(data => {
        sell = data.name;
        sellerPin = data.pincode;
        seller.textContent = sell;
        document.querySelector('.address-ans').textContent = data.address;
        document.querySelector('.pincode').textContent = data.pincode;
        document.querySelector('.number').textContent = data.number;
    })
}

const comparePincode = (sellerPin, userPin) => {
    sellerPin = parseInt(sellerPin);
    userPin = parseInt(userPin);

    let url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${sellerPin}&desctinations=${userPin}&departure_time=now&key=YOUR TOKEN ID`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let distance = data.rows[0].elements[0].distance.text;
        let time = data.rows[0].elements[0].duration.text;
        if(sellerPin != userPin) {
            let tempDis = parseInt(distance.split(' '));
            if(tempDis < 1000) {
                pinAns.textContent = `Delivery Time : ${time}, Distance : ${distance}`;
            } else {
                pinAns.textContent = `Delivery Not Available`;
            }
        } else if(sellerPin == userPin) {
            pinAns.textContent = 'Delivery Within an Hour';
        }
    }) 
}

pinBtn.addEventListener('click', () => {
    comparePincode(sellerPin, userPincode.value);
})

const setFromsData = (data) => {
    productName.textContent = data.name;
    shortLine.textContent = data.shortDesc;
    desc.innerHTML = data.desc;
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

    exDate.textContent = data.exDate;
    manuDate.textContent = data.manuDate;
    perscription.textContent = data.perscription;

    stock.textContent = data.stock;

    const quanValue = document.querySelector('#quantity');

    const addCartBtn = document.querySelector('.cart-btn');
    const addWishlistBtn = document.querySelector('.wish-btn');

    addCartBtn.addEventListener('click', () => {
        if(parseInt(data.stock) > parseInt(quanValue.value)) {
            addCartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', data, quanValue.value, sell);
        }
        else {
            addCartBtn.innerHTML = 'Out of Stock';
        }
    
    })
        
    addWishlistBtn.addEventListener('click', () => {
        addWishlistBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', data, quanValue.value, sell);
    })
}

seller.addEventListener('click', () => {
    document.querySelector('.seller-address-popup').classList.toggle('hide');
})

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
        .then(() => {
            const productSec = document.querySelector('.product-data');
            productSec.classList.remove('hide');
            loader.style.display = 'none';
        })
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

if(location.pathname != '/product') {
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

    for(let i = 0; i < data.length; i++) {
        if(data[i].status == 'Active') {
            middle += `
                <div class="product-card">
                    <div class="product-image">
                        <span class="discount-tag">${data[i].discount}</span>
                        <img src="${data[i].image1}" class="product-thumb" alt="">
                        <button class="card-btn">add to wishlist</button>
                    </div>
                    <div class="product-info">
                        <a href="/product/${data[i].id}" class="product-brand">${data[i].name}</a>
                        <p class="product-short-descc">${data[i].shortDesc}</p>
                        <p class="Usage">${data[i].use}</p>
                        <span class="price">${data[i].sellPrice}</span>
                        <span class="actual-price">${data[i].actualPrice}</span>
                    </div>
                </div>
            `;
        }
    }
    p.innerHTML = start + middle + end;
}
