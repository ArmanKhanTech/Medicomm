let openEditor;

const createProduct = (data) => {

    openEditor = (id) => {
        sessionStorage.tempProduct = JSON.stringify(data);
        location.href = `/add-product/${id}`;
    }

    openProduct = (id) => {
        sessionStorage.tempProduct = JSON.stringify(data);
        location.href = `/product/${id}`;
    }

    let proConatiner = document.querySelector('.product-container');

    proConatiner.innerHTML += `
    <div class="product-card">
        <div class="product-image">
            <span class="discount-tag">${data.discount}</span>
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
        </div>
        <div class="product-info">
            <p class="product-brand">${data.name}</p>
            <p class="product-shortdes">${data.shortDes}</p>
            <p class="product-usage">${data.use}</p>
            <span class="price">${data.sellPrice}</span>
            <span class="actual-price">${data.actualPrice}</span>
        </div>
    </div> `;
}

const openDelPopup = (id) => {
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display = 'flex';

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () =>  deleteAlert.style.display = 'none');

    let delBtn = document.querySelector('.del1-btn');
    delBtn.addEventListener('click', () =>  delProduct(id));
}

const delProduct = (id) => {
    fetch('/delete-product', {
        method: 'post',
        headers: new Headers({'Content-Type' : 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        if(data == 'success'){
            location.reload();
        } else{
            showAlert('Some Problem Occured. Please Try Again :)')
        }
    })
}
