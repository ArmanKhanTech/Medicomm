let openEditor;

const radio = document.querySelector('.tabs');

radio.addEventListener('change', () => {
    const radioVal = document.querySelector('input[name="tabs"]:checked').value;
    if(radioVal == 'products') {
        document.querySelector('.add-product').classList.remove('hide');
        document.querySelector('.product-container').classList.remove('hide');
        document.querySelector('.heading4').classList.add('hide');
        document.querySelector('.order-list').classList.add('hide');
        document.querySelector('.heading5').classList.add('hide');
        document.querySelector('.order-history-list').classList.add('hide');
    } else if(radioVal == 'orders') {
        document.querySelector('.heading4').classList.remove('hide');
        document.querySelector('.order-list').classList.remove('hide');
        document.querySelector('.add-product').classList.add('hide');
        document.querySelector('.product-container').classList.add('hide');
        document.querySelector('.heading5').classList.add('hide');
        document.querySelector('.order-history-list').classList.add('hide');
    } else if(radioVal == 'history') {
        document.querySelector('.heading5').classList.remove('hide');
        document.querySelector('.order-history-list').classList.remove('hide');
        document.querySelector('.heading4').classList.add('hide');
        document.querySelector('.order-list').classList.add('hide');
        document.querySelector('.add-product').classList.add('hide');
        document.querySelector('.product-container').classList.add('hide');
    }
    
})

const setUpColor = (data) => {
    const proStatus = document.querySelectorAll('#product-status');

    for(let i = 0; i < data.length; i++) {
        if(data[i].status == 'Active') {
            proStatus[i].style.color = '#1fa4cc';
        }
    }
}

const createProduct = (data) => {
    openEditor = (id) => {
        sessionStorage.tempProduct = JSON.stringify(data);
        location.href = `/add-product/${id}`;
    }

    openProduct = (id) => {
        sessionStorage.tempProduct = JSON.stringify(data);
        location.href = `/product/${id}`;
    }

    let active = 'Active';
    let disabled = 'Disabled';

    let proConatiner = document.querySelector('.product-container');

    if(data.status == 'Active') {
        proConatiner.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">${data.discount}</span>
                    <span class="product-status" id="product-status">${data.status}</span>
                    <img src=${data.image1}>
                    <button class="action-btn edit-btn" onClick="openEditor('${data.id}')">
                        Edit
                    </button>
                    <button class="action-btn open-btn" onClick="openProduct('${data.id}')">
                        Open
                    </button>
                    <button class="action-btn delete-btn" onClick="openDelPopup('${data.id}')">
                        Delete
                    </button>
                    <button class="action-btn disable-btn" onClick="disableProduct('${data.id}', '${disabled}')">
                        Disable
                    </button>
                </div>
                <div class="product-info">
                    <p class="product-brand">${data.name}</p>
                    <p class="product-shortdes">${data.shortDes}</p>
                    <p class="product-usage">${data.use}</p>
                    <span class="price">${data.sellPrice}</span>
                    <span class="actual-price">${data.actualPrice}</span>
                </div>
            </div> 
        `;
    } else {
        proConatiner.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">${data.discount}</span>
                    <span class="product-status" id="product-status">${data.status}</span>
                    <img src=${data.image1}>
                    <button class="action-btn edit-btn" onClick="openEditor('${data.id}')">
                        Edit
                    </button>
                    <button class="action-btn open-btn" onClick="openProduct('${data.id}')">
                        Open
                    </button>
                    <button class="action-btn delete-btn" onClick="openDelPopup('${data.id}')">
                        Delete
                    </button>
                    <button class="action-btn disable-btn" onClick="disableProduct('${data.id}', '${active}')">
                        Enable
                    </button>
                </div>
                <div class="product-info">
                    <p class="product-brand">${data.name}</p>
                    <p class="product-shortdes">${data.shortDes}</p>
                    <p class="product-usage">${data.use}</p>
                    <span class="price">${data.sellPrice}</span>
                    <span class="actual-price">${data.actualPrice}</span>
                </div>
            </div> 
        `;
    }
}

const createOrders = (data, seller) => {
    let count = parseInt(1);
    let orderArr = [];

    let orderConatiner = document.querySelector('.order-container');

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].order.length; j++){
            if(data[i].order[j].soldby == seller && data[i].order[j].status != 'Delivered' && data[i].order[j].status != 'Cancelled'
            && data[i].order[j].status != 'Returned' &&  data[i].order[j].status != 'Failed') {
                orderConatiner.innerHTML += `
                    <div class="product-card-order">
                        <div class="product-image">
                        <span class="num">${count}</span>
                            <span class="product-status" id="product-status">${data[i].order[j].status}</span>
                            <img src=${data[i].order[j].image}>
                            <button class="action-btn change-status-btn" id="change-status-btn">
                                Change Status
                            </button>
                        </div>
                        <div class="product-info">
                            <p class="product-brand">${data[i].order[j].name}</p>
                            <span class="price1">Total : <span class="price1-ans">${data[i].order[j].price}</span></span>
                            <span class="quan">Quantity : <span class="quan-ans">${data[i].order[j].quantity}</span></span>
                            <div class="address-order">
                                <span class="address1 add-text-title">Address : <span class="add-text">${data[i].address.address}</span></span><br>
                                <span class="street1 add-text-title">Street : <span class="add-text">${data[i].address.street}</span></span><br>
                                <span class="landmark1 add-text-title">Landmark : <span class="add-text">${data[i].address.landmark}</span></span><br>
                                <span class="city1 add-text-title">City : <span class="add-text">${data[i].address.city}</span></span><br>
                                <span class="state1 add-text-title">State : <span class="add-text">${data[i].address.state}</span></span><br>
                                <span class="pin1 add-text-title">Pincode : <span class="add-text">${data[i].address.pincode}</span></span><br>
                            </div>
                        </div>
                    </div> 
                `;  
                orderArr.push(data[i]);
                count++;
            }
        }
    }
  
    setUpHistory(data, seller);
    setCount1(count);
    setUpEventsForOrderStatUpdate(orderArr);
}

const setUpEventsForOrderStatUpdate = (data) => {
    let statUpdate = document.querySelectorAll('#change-status-btn');

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].order.length; j++) {
            if(statUpdate[i]){
                statUpdate[i].addEventListener('click', () => {
                    fetch('/update-status', {
                        method: 'post',
                        headers: new Headers({'Content-Type': 'application/json'}),
                        body: JSON.stringify({
                            order: data[i].order[j],
                            email: data[i].email,
                        })
                    }).then(res => res.json())
                    .then(data => {
                        if(data == 'success') {
                            location.reload();
                            console.log('Order Updated');
                        } 
                    })
                })
            }
        }
    }
}

const setUpHistory = (data, seller) => {
    let count = parseInt(1);

    let orderConatiner = document.querySelector('.order-history-container');

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].order.length; j++){
            if(data[i].order[j].soldby == seller && data[i].order[j].status == 'Delivered' || data[i].order[j].status == 'Cancelled'
            || data[i].order[j].status == 'Returned' || data[i].order[j].status == 'Failed'){
                orderConatiner.innerHTML += `
                    <div class="product-card-order">
                        <div class="product-image">
                        <span class="num">${count}</span>
                            <span class="product-status" id="product-status">${data[i].order[j].status}</span>
                            <img src=${data[i].order[j].image}>
                        </div>
                        <div class="product-info">
                            <p class="product-brand">${data[i].order[j].name}</p>
                            <span class="price1">Total : <span class="price1-ans">${data[i].order[j].price}</span></span>
                            <span class="quan">Quantity : <span class="quan-ans">${data[i].order[j].quantity}</span></span>
                            <div class="address-order">
                                <span class="address1 add-text-title">Address : <span class="add-text">${data[i].address.address}</span></span><br>
                                <span class="street1 add-text-title">Street : <span class="add-text">${data[i].address.street}</span></span><br>
                                <span class="landmark1 add-text-title">Landmark : <span class="add-text">${data[i].address.landmark}</span></span><br>
                                <span class="city1 add-text-title">City : <span class="add-text">${data[i].address.city}</span></span><br>
                                <span class="state1 add-text-title">State : <span class="add-text">${data[i].address.state}</span></span><br>
                                <span class="pin1 add-text-title">Pincode : <span class="add-text">${data[i].address.pincode}</span></span><br>
                            </div>
                        </div>
                    </div> 
                `;  
                count++;
            }
        }
    }
    setCount2(count);
}

const openDelPopup = (id) => {
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display = 'flex';

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () =>  deleteAlert.style.display = 'none');

    let delBtn = document.querySelector('.del1-btn');
    delBtn.addEventListener('click', () =>  delProduct(id));
}

const disableProduct = (id, status) => {
    let data = {
        id: id,
        status: status
    }

    fetch('/disEna-product', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({data: data})
    }).then(res => res.json())
    .then(data => {
        if(data == 'success') {
            location.reload();
        } else {
            showAlert('Some Problem Occured. Please Try Again :)')
        }
    })
}

const delProduct = (id) => {
    fetch('/delete-product', {
        method: 'post',
        headers: new Headers({'Content-Type' : 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        if(data == 'success') {
            location.reload();
        } else {
            showAlert('Some Problem Occured. Please Try Again :)')
        }
    })
}

const setCount = (pro) => {
    const proCount = document.querySelector('.pro-count');
    proCount.innerHTML = pro;

    if(pro == 0) {
        document.querySelector('.no-products-img').classList.remove('hide');
    }
}

const setCount1 = (order) => {
    const orderCount = document.querySelector('.order-count');
    orderCount.innerHTML = order - 1;

    if(order-1 == 0) {
        console.log(order);
        document.querySelector('.no-orders-img').classList.remove('hide');
    }
}

const setCount2 = (order) => {
    const orderCount = document.querySelector('.order-history-count');
    orderCount.innerHTML = order - 1;

    if(order-1 == 0) {
        console.log(order);
        document.querySelector('.no-history-img').classList.remove('hide');
    }
}

document.querySelector('.add-product').classList.remove('hide');
document.querySelector('.product-container').classList.remove('hide');

