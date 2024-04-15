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

    for(let i = 0; i < data.length; i++) {
        if(data[i].status == 'Active') {
            middle += `
                <div class="product-card">
                    <div class="product-image-home">
                        <span class="discount-tag2">${data[i].discount}</span>
                        <img src="${data[i].image1}" class="product-thumb-home" alt="">
                        <button class="card-btn2" id="card-btn2">add to wishlist</button>
                    </div>
                    <div class="product-info-home">
                        <a href="/product/${data[i].id}" class="product-brand-home">${data[i].name}</a>
                        <p class="product-short-desc-home">${data[i].shortDesc}</p>
                        <p class="usage2">${data[i].use}</p>
                        <span class="price-home">${data[i].sellPrice}</span>
                        <span class="actual-price-home">${data[i].actualPrice}</span>
                    </div>
                </div>
            `;
        }
    }

    p.innerHTML = start + middle + end;
    setupEvents2(data);
}

const setupEvents2 = (data) => {
    const wishlistBtn = document.querySelectorAll('#card-btn2');

    for(let i = 0; i < data.length; i++) {
        if(wishlistBtn[i]) {
            wishlistBtn[i].addEventListener('click', () => {
                add_to_wishlist(data[i]);
            });
        }
    }
}

getProducts2(cate2);