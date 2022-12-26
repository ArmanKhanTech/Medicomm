let cate = 'Tablet';

const getProducts = (cate) => {
    return fetch('/get-products', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({cate: cate})
    }).then(res => res.json())
    .then(data => {
        createProductCards(data, '.section1');
    })
}

const createProductCards = (data, parent) => {
    const p = document.querySelector(parent);

    let start = '<div class="product-container">';
    let middle = '';
    let end = '</div>';

    for(let i = 0; i < data.length; i++)
    {
        middle += `
        <div class="product-card">
            <div class="product-image">
                <span class="discount-tag">${data[i].discount}</span>
                <img src="${data[i].image1}" class="product-thumb" alt="">
                <button class="card-btn" id="card-btn">add to wishlist</button>
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
    setupEvents(data);
}

const setupEvents = (data) => {
    const wishlistBtn = document.querySelectorAll('#card-btn');

    for(let i = 0; i < data.length; i++){
        wishlistBtn[i].addEventListener('click', () => {
            add_to_wishlist(data[i]);
        });
    }
}

getProducts(cate);