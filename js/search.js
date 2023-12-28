let tac = true;

const btnContainer = document.querySelector('.collection-container');
const bottomPadding = document.querySelector('.product-container1');
const searchcontainer = document.querySelector('.search-results');
let loader = document.querySelector('.loader');

const getAllProducts = (tac) => {
    fetch('/get-all-products', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({tac: tac})
    }).then(res => res.json())
    .then(data => {
        createProductCards(data, '.results');
    })
}

const createProductCards = (data, parent) => {
    const p = document.querySelector(parent);

    let start = '<div class="product-container1">';
    let middle = '';
    let end = '</div>';

    const ids = data.map(o => o.id)
    data = data.filter(({id}, index) => !ids.includes(id, index + 1));

    for(let i = 0; i < data.length; i++) {
        if(data[i].status == 'Active') {
            middle += `
                <div class="product-card1">
                    <div class="product-image1">
                        <span class="discount-tag1" id="discount-tag1">${data[i].discount}</span>
                        <img src="${data[i].image1}" class="product-thumb1" alt="">
                        <button class="card-btn1" id="card-btn1">add to wishlist</button>
                    </div>
                    <div class="product-info1">
                        <a href="/product/${data[i].id}" class="product-brand1">${data[i].name}</a>
                        <p class="product-short-des1">${data[i].shortDes}</p>
                        <p class="product-usage1" id="product-usage1">${data[i].use}</p>
                        <span class="price1">${data[i].sellPrice}</span>
                        <span class="actual-price1">${data[i].actualPrice}</span>
                    </div>
                </div>
            `;
        }
    }

    if(data.length > 16) {
        btnContainer.classList.remove('hide');
        bottomPadding.style.paddingBottom = '100px';
    } else {
        bottomPadding.style.paddingBottom = '60px';
    }

    p.innerHTML = start + middle + end;
    loader.style.display = 'none';
    searchcontainer.classList.remove('hide');

    setupEvents(data);
    setbgcolor(data);
}

const setupEvents = (data) => {
    const wishlistBtn = document.querySelectorAll('#card-btn1');

    for(let i = 0; i < data.length; i++) {
        if(wishlistBtn[i]) {
            wishlistBtn[i].addEventListener('click', () => {
                add_to_wishlist(data[i]);
            });
        }
    }
}

const setbgcolor = (data) => {
    const wishlistBtnBg = document.querySelectorAll('.card-btn1');
    const discountTagBg = document.querySelectorAll('.discount-tag1');
    const usageBg = document.querySelectorAll('.product-usage1');

    for(let i = 0; i < data.length; i++) {
        if(wishlistBtnBg[i] && discountTagBg[i] && usageBg[i]) {
            var randomColor = randDarkColor();
            wishlistBtnBg[i].style.background = randomColor;
            discountTagBg[i].style.background = randomColor;
            usageBg[i].style.background = randomColor;
        }
    }
}

function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

const searchKey = decodeURI(location.pathname.split('/').pop());
const searchSpanElement = document.querySelector('#result-key');
const noSearchResultImg = document.querySelector('.no-result');
const heading = document.querySelector('.heading');

const getProducts = (searchKey) => {
    fetch('/get-search-result', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({key: searchKey})
    }).then(res => res.json())
    .then(data => {
        if(data == 'no-products'){
            noSearchResultImg.classList.remove('hide');
            loader.style.display = 'none';
        } else{
            createProductCards(data, '.results');
        }
    })
}

if(searchKey == null || searchKey == "search.html") {
    heading.style.display = 'none';
    getAllProducts(tac);
} else {
    searchSpanElement.innerHTML = searchKey;
    getProducts(searchKey);
}

