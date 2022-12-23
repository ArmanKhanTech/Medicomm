const createSmallCart = (data) => {
    return `
    <div class="sm-product">
        <img src="${data.image}" class="sm-product-img" alt="">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.shortDes}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement">-</button>
            <p class="item-count">${data.quantity}</p>
            <button class="counter-btn increment">+</button>
        </div>
        <p class="sm-price" data-price="${data.actualPrice}">${data.actualPrice}</p>
        <button class="sm-delete-btn"><img src="images/close.png"></button>
    </div>
    `;
}

const setProducts = (name) => {
    const element = document.querySelector(`.${name}`);
    let data = JSON.parse(localStorage.getItem(name));
    if(data == null){
        element.innerHTML = `<img src="images/no-product.png" class="empty-cart" alt="">`;
    } else {
        let temp = '';
        for(let i = 0; i < data.length; i++){
            if(temp != data[i].name){
                element.innerHTML += createSmallCart(data[i]);
                temp = data[i].name;
            }
        }
    }
}

if(sessionStorage.getItem('user') != null){
    setProducts('cart');
    setProducts('wishlist');
} else{
    location.href = 'login.html';
}

//fix quantity