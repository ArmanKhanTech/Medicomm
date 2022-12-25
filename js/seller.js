//popup name not working
let loader = document.querySelector('.loader');
let user = JSON.parse(sessionStorage.user || null);
let emptySvg = document.querySelector('no-product-pic');

const userImageButton1 = document.querySelector('#user-img');
const cartImageButton1 = document.querySelector('#cart-img');

userImageButton1.addEventListener('click', () =>{
    const userImageButton = document.querySelector('#user-img');
    const userPopup = document.querySelector('.login-logout-popup');
    const popupText = document.querySelector('.account-info');
    const actionBtn = document.querySelector('#user-btn');
    if(user != null){
        // means user is logged in
        popupText.innerHTML = `Logged-in as, ${user.name}`;
        actionBtn.innerHTML = 'Log-Out';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
    } else{
        // he is not
        popupText.innerHTML = 'Log-In to Place Order';
        actionBtn.innerHTML = 'Log-In';
        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
    }
})

const becomeSeller= document.querySelector('.become-seller');
const productList= document.querySelector('.product-list');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

window.onload = () => {
    if(user){
        if(!user.seller){
            loader.style.display = 'none';
            becomeSeller.classList.remove('hide');
        } else {
            loader.style.display = 'block';
            setupProducts();
        }
    } else{
        location.replace('/login')
    }
}

showApplyFormBtn.addEventListener('click', () =>{
    becomeSeller.classList.add('hide');
    applyForm.classList.remove('hide');
})

// formm submission
const applyBtn = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#business-name');
const businessAdd = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-cond');

applyBtn.addEventListener('click', () =>{
    if(!businessName.value.length || !businessAdd.value.length || 
        !about.value.length || !number.value.length ){
            showAlert('Fill All the Inputs');
    } else if(!tac.checked){
        showAlert('You Must Agree All Terms and Conditions');
    } else {
        loader.style.display = 'block';
        sendData('/seller' , {
            name: businessName.value, 
            address: businessAdd.value, 
            about: about.value, 
            number: number.value, 
            tac: true,
            email: JSON.parse(sessionStorage.user).email
        })
    }
})

const addProduct = document.querySelector('.add-product-btn');

addProduct.addEventListener('click', () =>{
    location.replace('/addproduct.html');
})

const setupProducts = () => {
    fetch('/get-products', {
        method :'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({email: user.email}),
    }).then(res => res.json()).then(data => {
        loader.style.display = 'none';
        productList.classList.remove('hide');
        if(data == 'no-products'){
            // show no product img or text
        } else { 
            data.forEach(product => createProduct(product));
        }
    });
}

