let cate2 = 'Instrument';

const getProducts2 = (cate2) => {
    return fetch('/get-products', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({cate: cate2})
    }).then(res => res.json())
    .then(data => {
        createProductCards2(data, '.section3');
    })
}

const createProductCards2 = (data, parent) => {
    const p = document.querySelector(parent);

    let start = '<div class="product-container1">';
    let middle = '';
    let end = '</div>';

    for(let i = 0; i < data.length; i++)
    {
        middle += `
        <div class="product-card">
            <div class="product-image1">
                <span class="discount-tag2">${data[i].discount}</span>
                <img src="${data[i].image1}" class="product-thumb1" alt="">
                <button class="card-btn2" id="card-btn2">add to wishlist</button>
            </div>
            <div class="product-info1">
                <a href="/product/${data[i].id}" class="product-brand1">${data[i].name}</a>
                <p class="product-short-des1">${data[i].shortDes}</p>
                <p class="usage2">${data[i].use}</p>
                <span class="price1">${data[i].sellPrice}</span>
                <span class="actual-price1">${data[i].actualPrice}</span>
            </div>
        </div>`;
    }

    p.innerHTML = start + middle + end;
    setupEvents2(data);
}

const setupEvents2 = (data) => {
    const wishlistBtn = document.querySelectorAll('#card-btn2');

    for(let i = 0; i < data.length; i++){
        wishlistBtn[i].addEventListener('click', () => {
            add_to_wishlist(data[i]);
        });
    }
}

getProducts2(cate2);