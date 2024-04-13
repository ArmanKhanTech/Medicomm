const createOrders = (data) => {
    const orderContainer = document.querySelector('.order');
    const orderCount = document.querySelector('.order-count');

    var totalOrders = parseInt(0);

    let orderArr = [];
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].order.length; j++){
            if(data[i].order[j].status != 'Delivered' && data[i].order[j].status != 'Failed' && data[i].order[j].status != 'Cancelled') {
                orderContainer.innerHTML += `
                    <div class="sm-product">
                        <img src="${data[i].order[j].image}" class="sm-product-img" alt="">
                        <div class="sm-text">
                            <p class="sm-product-name">${data[i].order[j].name}</p>
                            <p class="status">Status: <span class="status-ans">${data[i].order[j].status}</span></p>
                        </div>
                        <div class="item-counter">
                            <p class="quantity" id="quantity">Quantity:</p>
                            <p class="item-count" id="item-count">${data[i].order[j].quantity}</p>
                        </div>
                        <p class="sm-price" id="sm-price">${data[i].order[j].price}</p>
                        <button class="sm-delete-btn" id="sm-delete-btn"><img src="../images/close.png"></button>
                    </div>
                `;
                totalOrders++;
                orderArr.push(data[i].order[j]);
            }
        }
    }
    
    const orderSection = document.querySelector('.order-section');

    let loader = document.querySelector('.loader');
    loader.style.display = 'none';

    orderSection.classList.remove('hide');
    orderCount.innerHTML = totalOrders;

    setupEvents(orderArr);

    if(totalOrders == 0) {
        document.querySelector('.no-orders-img-11').classList.remove('hide');
    } 
}

const openDelPopup = (order) => {
    document.querySelector('.delete-alert').style.display='flex';

    document.querySelector('.del-btn').addEventListener('click', () => {
        fetch('/cancel-order', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                order: order,
                email: user.email
            })
        }).then(res => res.json()).then(data => {
            if(data == 'success'){
                location.reload();
            } else {
                showAlert('Something went wrong');
            }
        })
    });

    document.querySelector('.close-btn-del').addEventListener('click', () => {
        document.querySelector('.delete-alert').style.display='none';
    });
}

const createHistory = (data) => {
    const hisContainer = document.querySelector('.history');
    const hisCount = document.querySelector('.history-count');

    var totalOrders = parseInt(0);

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].order.length; j++){
            if(data[i].order[j].status == 'Delivered' || data[i].order[j].status == 'Failed' || data[i].order[j].status == 'Cancelled') {
                hisContainer.innerHTML += `
                    <div class="sm-product">
                        <img src="${data[i].order[j].image}" class="sm-product-img" alt="">
                        <div class="sm-text">
                            <p class="sm-product-name">${data[i].order[j].name}</p>
                            <p class="status">Status: <span class="status-ans">${data[i].order[j].status}</span></p>
                        </div>
                        <div class="item-counter">
                            <p class="quantity" id="quantity">Quantity:</p>
                            <p class="item-count" id="item-count">${data[i].order[j].quantity}</p>
                        </div>
                        <p class="sm-price" id="sm-price">${data[i].order[j].price}</p>
                    </div>
                `;
                totalOrders++; 
            }
        }
    }
        
    hisCount.innerHTML = totalOrders;

    if(totalOrders == 0) {
        document.querySelector('.no-orders-img-12').classList.remove('hide');
    } 
}

const getOrders = (email) => {
    fetch('/fetch-orders', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({email: email})
    }).then(res => res.json()).then(data => {
        createOrders(data);
        createHistory(data);
    })
}

const setupEvents = (order) => {
    const deleteBtn = document.querySelectorAll('#sm-delete-btn');

     for(let i = 0; i < order.length; i++){
        if(deleteBtn[i]) {
            deleteBtn[i].addEventListener('click', () => {
                openDelPopup(order[i]);
            });
        }
    } 
}

let user = sessionStorage.getItem('user');
user = JSON.parse(user);

if(sessionStorage.getItem('user') != null) {
    getOrders(user.email);
} else {
    location.href = 'login.html';
}