//popup name not working
let loader = document.querySelector('.loader');
let user = JSON.parse(sessionStorage.user || null);

const becomeSeller= document.querySelector('.become-seller');
const productList= document.querySelector('.product-list');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

showApplyFormBtn.addEventListener('click', () =>{
    becomeSeller.classList.add('hide');
    applyForm.classList.remove('hide');
})

// formm submission
const applyBtn = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#business-name');
const businessAdd = document.querySelector('#business-add');
const pincode = document.querySelector('#pincode');
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
            pincode: pincode.value,
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
        if(data != 'no-products'){
            data.forEach(product => createProduct(product));
            setCount(data.length, 0);
        } 
    });
}

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