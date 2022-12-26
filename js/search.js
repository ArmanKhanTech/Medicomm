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

    for(let i = 0; i < data.length; i++)
    {
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
        </div>`;
    }

    if(data.length > 16){
        btnContainer.classList.remove('hide');
        bottomPadding.style.paddingBottom = '100px';
    } else{
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

    for(let i = 0; i < data.length; i++){
        wishlistBtn[i].addEventListener('click', () => {
            add_to_wishlist(data[i]);
        });
    }
}

const setbgcolor = (data) => {
    const wishlistBtnBg = document.querySelectorAll('.card-btn1');
    const discountTagBg = document.querySelectorAll('.discount-tag1');
    const usageBg = document.querySelectorAll('.product-usage1');

    for(let i = 0; i < data.length; i++){
        var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        wishlistBtnBg[i].style.background = randomColor;
        discountTagBg[i].style.background = randomColor;
        usageBg[i].style.background = randomColor;
    }
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

if(searchKey == null || searchKey == "search.html"){
    heading.style.display = 'none';
    getAllProducts(tac);
} else{
    searchSpanElement.innerHTML = searchKey;
    getProducts(searchKey);
}

