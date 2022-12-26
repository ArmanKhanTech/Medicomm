const createSmallCart = (data) => {
    return `
    <div class="sm-product">
        <img src="${data.image}" class="sm-product-img" alt="">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.shortDes}</p>
        </div>
        <div class="item-counter">
            <button class="counter-btn decrement" id="decrement">-</button>
            <p class="item-count" id="item-count">${data.quantity}</p>
            <button class="counter-btn increment" id="increment">+</button>
        </div>
        <p class="sm-price" data-price="${data.actualPrice}" id="sm-price">₹${data.actualPrice * data.quantity}</p>
        <button class="sm-delete-btn" id="sm-delete-btn"><img src="images/close.png"></button>
    </div>
    `;
}

const createWishlist = (data) => {
    return `
    <div class="sm-product">
        <img src="${data.image}" class="sm-product-img" alt="">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.shortDes}</p>
        </div>
        <button class="add-to-cart" id="add-to-cart">Add to Cart</button>
        <p class="sm-price" data-price="${data.actualPrice}" id="sm-price">₹${data.actualPrice}</p>
        <button class="sm-delete-btn2" id="sm-delete-btn2"><img src="images/close.png"></button>
    </div>
    `;
}

let totalBill = parseInt(0);
let billPrice = document.querySelector('.bill');
const checkoutSection = document.querySelector('.checkout-section');

const setProducts = (name) => {
    const element = document.querySelector(`.${name}`);
    let data = JSON.parse(localStorage.getItem(name));
    if(data.length == 0 && name == 'cart'){
        element.innerHTML = `<img src="images/no-product.png" class="empty-cart" alt="">`;
        checkoutSection.style.display = 'none';
    } else {
        let temp = '';
        for(let i = 0; i < data.length; i++){
            if(temp != data[i].name && name == 'cart'){
                element.innerHTML += createSmallCart(data[i]);
                temp = data[i].name;
                totalBill = parseInt(totalBill + (data[i].actualPrice  * data[i].quantity));
            } else if(temp != data[i].name && name == 'wishlist'){
                element.innerHTML += createWishlist(data[i]);
                temp = data[i].name;
            }
        }
        updateBill(totalBill, 'new');
    }
    setupEvents(name);
}

const setProducts2 = (name) => {
    const element = document.querySelector(`.${name}`);
    let data = JSON.parse(localStorage.getItem(name));

    if(data.length == 0 && name == 'wishlist'){
        element.innerHTML = `<img src="images/no-product.png" class="empty-cart" alt="">`;
    } else {
        let temp = '';
        for(let i = 0; i < data.length; i++){
            if(temp != data[i].name && name == 'wishlist'){
                element.innerHTML += createWishlist(data[i]);
                temp = data[i].name;
            }
        }
    }
    setupEvents2(name);
}

const updateBill = (value, operation) => {
    if(operation == 'add'){
        totalBill = parseInt(totalBill) + parseInt(value);
    } else if(operation == 'remove'){
        totalBill = parseInt(totalBill) - parseInt(value);
    } else if(operation == 'new'){
        billPrice.innerHTML = `₹${parseInt(totalBill)}`;
    }
    billPrice.textContent= `₹${parseInt(totalBill)}`;
}

// fix it
const setupEvents = (name) => {
    const counterMinus = document.querySelectorAll('#decrement');
    const counterPlus = document.querySelectorAll('#increment');
    const counts = document.querySelectorAll('#item-count');
    const price = document.querySelectorAll('#sm-price');
    const deleteBtn = document.querySelectorAll('#sm-delete-btn');

    let product = JSON.parse(localStorage.getItem(name));

    // loop executing twice fix it
    if(name == 'cart'){
        counts.forEach((item, i) => {
            let cost = price[i].getAttribute('data-price');

            counterMinus[i].addEventListener('click', () => {
                if(item.innerHTML > 1){
                    item.innerHTML--;
                    totalBill -= parseInt(cost);
                    price[i].innerHTML = `₹${cost * item.innerHTML}`;
                    cost = parseInt(cost);
                    updateBill(cost, 'remove');
                }
            });

            counterPlus[i].addEventListener('click', () => {
                if(item.innerHTML < 100){
                    item.innerHTML++;
                    totalBill += parseInt(cost);
                    price[i].innerHTML = `₹${cost * item.innerHTML}`;
                    cost = parseInt(cost);
                    updateBill(cost, 'add');
                }
            });

            deleteBtn.forEach((item, i) => {
                item.addEventListener('click', () => {
                    product = product.filter((data, index) => index != i);
                    localStorage.setItem(name, JSON.stringify(product));
                    location.reload();
                });
            });
        });
    } 
}

const setupEvents2 = (name) => {
    const deleteBtn = document.querySelectorAll('#sm-delete-btn2');
    const addToCart = document.querySelectorAll('#add-to-cart');

    let product = JSON.parse(localStorage.getItem(name));

    if(name == 'wishlist'){
        deleteBtn.forEach((item, i) => {
            item.addEventListener('click', () => {
                product = product.filter((data, index) => index != i);
                localStorage.setItem(name, JSON.stringify(product));
                location.reload();
            });
        });
    }
}

if(sessionStorage.getItem('user') != null){
    setProducts('cart');
    setProducts2('wishlist');
} else{
    location.href = 'login.html';
}