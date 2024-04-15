const placeorder = document.querySelector('#place-order');
const radio = document.querySelector('input[name="payment"]:checked').value;
let order_id = '';

placeorder.addEventListener('click', () => {
    if(document.getElementById('cash').checked){
        let address = getAddress();
        let finalOrder = JSON.parse(localStorage.getItem('order'));

        if(address) {
            document.querySelector('.loader').style.display = 'block';
            fetch('/order', {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify({
                    order: finalOrder,
                    email: JSON.parse(sessionStorage.user).email,
                    address: address,
                    mode: 'cash'
                })
            }).then(res => res.json())
            .then(data => {
                if(data.alert == 'Your Order was Placed Successfully.') {
                    updateProStock(finalOrder);
                    document.querySelector('.loader').style.display = 'none';
                    localStorage.removeItem('cart');
                    localStorage.removeItem('order');
                    localStorage.removeItem('totalBill');
                    showAlert1(data.alert, 'success');
                    setTimeout(() => {
                        location.replace('/');
                    }, 2000);
                } else {
                    showAlert1(data.alert);
                }
            })
        }
    } else if(document.getElementById('online').checked) {
        let receipt = Math.floor(Math.random() * 100000) + 1;
        totalBill = parseInt(localStorage.getItem('totalBill')) * 100;

        document.querySelector('.loader').style.display = 'block';

        fetch('/order-online', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                amount: totalBill,
                currency: 'INR',
                receipt: receipt,
                notes: 'Order Created',
            })
        }).then(res => res.json())
        .then(data => {
           order_id = data.id;
           onlineCheckout();
        })
    }
});

const onlineCheckout = () => {
    var options = {
        "key": "YOUR RAZORPAY ID", 
        "amount": totalBill, 
        "currency": "INR",
        "name": "Medicomm",
        "image": "../images/mainlogo.png",
        "description": "Pay & Checkout",
        "order_id": order_id,  
        "handler": function (response){
            paymentSuccess();
        },
        "prefill": {
            "name": JSON.parse(sessionStorage.getItem("user")).name,  
            "email": JSON.parse(sessionStorage.getItem("user")).email,
        }, 
        "theme": {
            "color": "#1fa4cc"
        }
    };

    var razorpayObject = new Razorpay(options);

    razorpayObject.open();
    razorpayObject.on('payment.failed', function (response){
            alert("This step of Payment Failed");
    });
}

const paymentSuccess = () => {
    let address = getAddress();
    let finalOrder = JSON.parse(localStorage.getItem('order'));

    if(address) {
        fetch('/order', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                order: finalOrder,
                email: JSON.parse(sessionStorage.user).email,
                address: address,
                mode: 'online'
            })
        }).then(res => res.json())
        .then(data => {
            if(data.alert == 'Your Order was Placed Successfully.') {
                document.querySelector('.loader').style.display = 'none';
                updateProStock(finalOrder);
                localStorage.removeItem('cart');
                localStorage.removeItem('order');
                localStorage.removeItem('totalBill');
                showAlert1(data.alert, 'success');
                setTimeout(() => {
                    location.replace('/');
                }, 2000);
            } else {
                showAlert1(data.alert);
            }
        })
    }
}

const updateProStock = (finalOrder) => {
    finalOrder.forEach((item, i) => {
        fetch('/get-product', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                id: finalOrder[i].id,
            })
        }).then(res => res.json())
        .then(data => {
            var stock = parseInt(data.stock) - parseInt(finalOrder[i].quantity);
            updateStock(finalOrder[i].id, stock);
        })
    });
}

const updateStock = (id, diff) => {
    fetch('/update-stock', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            id: id,
            stock: diff,
        })
    }).then(res => res.json())
    .then(data => {
        //
    })
}

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
        !state.length || !pincode.length || !landmark.length) {
        showAlert('Please fill all the Fields.');
    } else {
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
                <p class="sm-desc">${data.shortDesc}</p>
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
    if(data.length == 0 || data == null && name == 'cart') {
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

const setupEvents3 = (name) => {
    const counts = document.querySelectorAll('#item-count');
    const deleteBtn = document.querySelectorAll('#sm-delete-btn');

    let product = JSON.parse(localStorage.getItem(name));

    if(name == 'cart') {
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

if(!sessionStorage.user) {
    location.replace("login.html");
} else {
    setProducts('cart');
}
