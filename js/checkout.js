const placeorder = document.querySelector('#place-order');
placeorder.addEventListener('click', () => {
    let address = getAddress();

    if(address){
        fetch('/order', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                order: JSON.parse(localStorage.getItem('cart')),
                email: JSON.parse(sessionStorage.user).email,
                address: address,
            })
        }).then(res => res.json())
        .then(data => {
            alert(data);
        })
    }
});

const getAddress = () => {
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let pincode = document.querySelector('#pincode').value;
    let landmark = document.querySelector('#landmark').value;

    if(!address.length || !street.length || !city.length || 
        !state.length || !pincode.length || !landmark.length){
            showAlert('Please Fill All The Fields.');
        } else{
            return {address, street, city, state, pincode, landmark};
        }
}

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
    setupEvents3(name);
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
const setupEvents3 = (name) => {
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

if(!sessionStorage.user){
    location.replace("login.html");
} else{
    setProducts('cart');
}