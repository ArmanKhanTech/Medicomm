let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

// checknig user is logged in or not
window.onload = () => {
    if(!user){
        //if(!compareToken(user.authToken, user.email)){
            location.replace('/login.html');
        //}
    }
}

// price calc
const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

var a = "";
var s = "";
var d = "";

discountPercentage.addEventListener('input', () => {
    if(discountPercentage.value > 100){
        discountPercentage.value = 90;
    } else{
        let discount = actualPrice.value * discountPercentage.value / 100;
        sellingPrice.value = actualPrice.value - discount;
    }
})

sellingPrice.addEventListener('input', () => {
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
})

//upload images
const uploadimgbtn = document.querySelector('#img-upload-btn');
const link1 = document.querySelector('#link-img-1');
const link2 = document.querySelector('#link-img-2');
const link3 = document.querySelector('#link-img-3');
const link4 = document.querySelector('#link-img-4');

const pic1 = document.querySelector('.product-pic1s');
const pic2 = document.querySelector('.product-pic2s');
const pic3 = document.querySelector('.product-pic3s');
const pic4 = document.querySelector('.product-pic4s');

var link1s = "";
var link2s = "";
var link3s = "";
var link4s = "";

uploadimgbtn.addEventListener('click', () => {
    var url = "http://drive.google.com/uc?export=view&id=";

    //img 1
    link1s = link1.value;
    link1s = link1s.substring(link1s.lastIndexOf("/"), 32);
    link1s = url + link1s;
    //console.log(link1s);
    pic1.src = link1s;

    //img 2
    link2s = link2.value;
    link2s = link2s.substring(link2s.lastIndexOf("/"), 32);
    link2s = url + link2s;
    //console.log(link1s);
    pic2.src = link2s;

    //img 3
    link3s = link3.value;
    link3s = link3s.substring(link3s.lastIndexOf("/"), 32);
    link3s = url + link3s;
    //console.log(link1s);
    pic3.src = link3s;

    // img 4
    link4s = link4.value;
    link4s = link4s.substring(link4s.lastIndexOf("/"), 32);
    link4s = url + link4s;
    //console.log(link1s);
    pic4.src = link4s;
});

const showImg = () => {
    link1s = link1.value;
    pic1.src = link1s;
    link2s = link2.value;
    pic2.src = link2s;
    link3s = link3.value;
    pic3.src = link3s;
    link4s = link4.value;
    pic4.src = link4s;
}

// form submission

const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#descirption');

const stock = document.querySelector('#stock');
const use = document.querySelector('#use');
const cate = document.querySelector('#cate');
const tac = document.querySelector('#tac');

// buttons
const addProductBtn = document.querySelector('#add-btn');

const validateForm = () => {
    if(!productName.value.length){
        return showAlert('Enter Product Name');
    } else if(shortLine.value.length > 100 || shortLine.value.length < 10){
        return showAlert('Short Description Must be Between 10 to 100 Letters Long');
    } else if(!des.value.length){
        return showAlert('Enter Detailed Description About the Product');
    } else if(!actualPrice.value.length || !discountPercentage.value.length || !sellingPrice.value.length){
        return showAlert('You Must Add Pricings');
    } else if(stock.value < 20){
        return showAlert('You Should Have at Least 20 Items in Stock');
    } else if(!use.value.length){
        return showAlert('Enter Use of the Products');
    } else if(!cate.value.length){
        return showAlert('Enter Category of the Product');
    } else if(!tac.checked){
        return showAlert('You Must Agree Our Terms and Conditions');
    } 
    d = discount.value;
    d = d + "% Off";
    a = actualPrice.value;
    a = "₹" + a;
    s = sellingPrice.value;
    s = "₹" + s;
    return true;
}

const productData = () => {
    return data = {
        name: productName.value,
        shortDes: shortLine.value,
        des: des.value,
        image1: link1s,
        image2: link2s,
        image3: link3s,
        image4: link4s,
        actualPrice: a,
        discount: d,
        sellPrice: s,
        stock: stock.value,
        use: use.value,
        cate : cate.value,
        tac: tac.checked,
        email: user.email,
        id: proId
    }
}

let proId = null;
proId = decodeURI(location.pathname.split('/').pop());

addProductBtn.addEventListener('click', () => {
    if(validateForm()){ // validateForm return true or false while doing validation
        loader.style.display = 'block';
        let data = productData();
        sendData('/add-product', data);
    }
})

const setFormsData = (data) => {
    productName.value = data.name;
    shortLine.value = data.shortDes;
    des.value = data.des;
    link1.value = data.image1;
    link2.value = data.image2;
    link3.value = data.image3;
    link4.value = data.image4;
    showImg();
    stock.value = data.stock;
    use.value = data.use;
    cate.value = data.cate;

    // fix it
    actualPrice.value = data.actualPrice;
    sellingPrice.value = data.sellPrice;
    discountPercentage.value = data.discount;
}

const fetchProductData = () => {
    delete sessionStorage.tempProduct;
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: proId})
    }).then((res) => res.json())
    .then(data => {
        setFormsData(data);
    }).catch(err => {
        location.replace('/seller');
    })
}

let proDetail = JSON.parse(sessionStorage.tempProduct || null);
    
if(proId != null){
    if(proDetail != null){
        fetchProductData();
    }
}
