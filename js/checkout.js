const placeorder = document.querySelector('#place-order');
placeorder.addEventListener('click', () => {
    let address = getAddress();
    let finalOrder = JSON.parse(localStorage.getItem('order'));

    if(address){
        fetch('/order', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                order: finalOrder,
                email: JSON.parse(sessionStorage.user).email,
                address: address,
            })
        }).then(res => res.json())
        .then(data => {
            if(data.alert == 'Your Order Was Placed Successfully.'){
                localStorage.removeItem('cart');
                localStorage.removeItem('order');
                localStorage.removeItem('totalBill');
                showAlert1(data.alert, 'success');
                setTimeout(function(){
                    location.href = 'index.html';
                }, 2000); 
            } else{
                showAlert1(data.alert);
            }
        })
    }
});

const finalOrder = () => {
    let orderArray = localStorage.getItem('order');
    orderArray = JSON.parse(orderArray);

    return orderArray;
}

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
    let orderArray = localStorage.getItem('order');
    var price = parseInt(0);
    var quantity = parseInt(0);

    orderArray = JSON.parse(orderArray);

    orderArray.forEach((item, i) => {
        if(orderArray[i].id == data.id){
            quantity = orderArray[i].quantity;
            price = orderArray[i].price;
        }
    });

    return `
    <div class="sm-product">
        <img src="${data.image}" class="sm-product-img" alt="">
        <div class="sm-text">
            <p class="sm-product-name">${data.name}</p>
            <p class="sm-des">${data.shortDes}</p>
        </div>
        <div class="item-counter">
            <p class="quantity" id="quantity">Quantity:</p>
            <p class="item-count" id="item-count">${quantity}</p>
        </div>
        <p class="sm-price" data-price="${data.actualPrice}" id="sm-price">${price}</p>
    </div>
    `;
}

let totalBill = parseInt(0);
let billPrice = document.querySelector('.bill');
const checkoutSection = document.querySelector('.checkout-section');

const setProducts = (name) => {
    const element = document.querySelector(`.${name}`);
    let data = JSON.parse(localStorage.getItem(name));
    if(data.length == 0 || data == null && name == 'cart'){
        element.innerHTML = `<img src="images/no-product.png" class="empty-cart" alt="">`;
        checkoutSection.style.display = 'none';
    } else {
        for(let i = 0; i < data.length; i++){
            element.innerHTML += createSmallCart(data[i]);
            totalBill = localStorage.getItem('totalBill');
            billPrice.innerHTML = `₹${totalBill}`;
        }
    }
    setupEvents3(name);
}

// fix it
const setupEvents3 = (name) => {
    const counts = document.querySelectorAll('#item-count');
    const deleteBtn = document.querySelectorAll('#sm-delete-btn');

    let product = JSON.parse(localStorage.getItem(name));

    // loop executing twice fix it
    if(name == 'cart'){
        counts.forEach((item, i) => {
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