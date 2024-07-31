let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector(".loader");

if (!user) {
  location.replace("/login");
}

const actualPrice = document.querySelector("#actual-price");
const discountPercentage = document.querySelector("#discount");
const sellingPrice = document.querySelector("#sell-price");

const manuDate = document.querySelector("#manuDate");
const exDate = document.querySelector("#exDate");
const perscription = document.querySelector("#perscription");

var a = "";
var s = "";
var d = "";

discountPercentage.addEventListener("input", () => {
  if (discountPercentage.value > 100) {
    discountPercentage.value = 90;
  } else {
    let discount = (actualPrice.value * discountPercentage.value) / 100;
    sellingPrice.value = actualPrice.value - discount;
  }
});

sellingPrice.addEventListener("input", () => {
  let discount = (sellingPrice.value / actualPrice.value) * 100;
  discountPercentage.value = discount;
});

const uploadimgbtn = document.querySelector("#img-upload-btn");
const link1 = document.querySelector("#link-img-1");
const link2 = document.querySelector("#link-img-2");
const link3 = document.querySelector("#link-img-3");
const link4 = document.querySelector("#link-img-4");

const pic1 = document.querySelector(".product-image-1");
const pic2 = document.querySelector(".product-image-2");
const pic3 = document.querySelector(".product-image-3");
const pic4 = document.querySelector(".product-image-4");

var link1s = "";
var link2s = "";
var link3s = "";
var link4s = "";

uploadimgbtn.addEventListener("click", () => {
  var url = "http://drive.google.com/uc?export=view&id=";

  link1s = link1.value;
  link1s = link1s.substring(link1s.lastIndexOf("/"), 32);
  link1s = url + link1s;
  pic1.src = link1s;

  link2s = link2.value;
  link2s = link2s.substring(link2s.lastIndexOf("/"), 32);
  link2s = url + link2s;
  pic2.src = link2s;

  link3s = link3.value;
  link3s = link3s.substring(link3s.lastIndexOf("/"), 32);
  link3s = url + link3s;
  pic3.src = link3s;

  link4s = link4.value;
  link4s = link4s.substring(link4s.lastIndexOf("/"), 32);
  link4s = url + link4s;
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
};

const productName = document.querySelector("#product-name");
const shortLine = document.querySelector("#short-desc");
const desc = document.querySelector("#descirption");

const stock = document.querySelector("#stock");
const use = document.querySelector("#use");
const cate = document.querySelector("#cate");
const tac = document.querySelector("#tac");

const addProductBtn = document.querySelector("#add-btn");

const validateForm = () => {
  if (!productName.value.length) {
    return showAlert("Please enter product's name");
  } else if (shortLine.value.length > 100 || shortLine.value.length < 10) {
    return showAlert(
      "Short description must be between 10 to 100 letters long",
    );
  } else if (!desc.value.length) {
    return showAlert("Please enter detailed description about the product");
  } else if (
    !actualPrice.value.length ||
    !discountPercentage.value.length ||
    !sellingPrice.value.length
  ) {
    return showAlert("You must add Pricings");
  } else if (stock.value < 20) {
    return showAlert("You should have atleast 20 items in stock");
  } else if (!use.value.length) {
    return showAlert("Please enter use of the product");
  } else if (!cate.value.length) {
    return showAlert("Please enter category of the product");
  } else if (!tac.checked) {
    return showAlert("You must agree our terms and conditions");
  } else if (!manuDate.value.length) {
    return showAlert("Please enter manufacturing date of the product");
  } else if (!exDate.value.length) {
    return showAlert("Please enter expiry date of the product");
  } else if (!perscription.value.length) {
    return showAlert("Please enter perscription detail of the product");
  }

  d = discount.value;
  d = d + "% Off";
  a = actualPrice.value;
  a = "₹" + a;
  s = sellingPrice.value;
  s = "₹" + s;
  return true;
};

let addDate = new Date();
let modifyDate = new Date();
let todayDate = new Date();

const productData = () => {
  todayDate = todayDate.toDateString();

  if (proId == null) {
    proId = `${productName.value.toLowerCase()}-${Math.floor(Math.random() * 5000)}`;
    addDate = addDate.toDateString();
    modifyDate = null;
  } else {
    modifyDate = modifyDate.toDateString();
  }

  if (addDate == todayDate) {
    return (data = {
      name: productName.value,
      shortDesc: shortLine.value,
      desc: desc.value,
      image1: link1s,
      image2: link2s,
      image3: link3s,
      image4: link4s,
      actualPrice: a,
      discount: d,
      sellPrice: s,
      stock: stock.value,
      use: use.value,
      cate: cate.value,
      tac: tac.checked,
      email: user.email,
      id: proId,
      addDate: addDate,
      modifyDate: modifyDate,
      manuDate: manuDate.value,
      exDate: exDate.value,
      perscription: perscription.value,
      status: "Active",
    });
  } else {
    return (data = {
      name: productName.value,
      shortDesc: shortLine.value,
      desc: desc.value,
      image1: link1s,
      image2: link2s,
      image3: link3s,
      image4: link4s,
      actualPrice: a,
      discount: d,
      sellPrice: s,
      stock: stock.value,
      use: use.value,
      cate: cate.value,
      tac: tac.checked,
      email: user.email,
      id: proId,
      addDate: addDate,
      modifyDate: modifyDate,
      manuDate: manuDate.value,
      exDate: exDate.value,
      perscription: perscription.value,
      status: "Active",
    });
  }
};

let proId = null;
proId = decodeURI(location.pathname.split("/").pop());

if (proId == decodeURI("addproduct.html")) {
  proId = null;
}

addProductBtn.addEventListener("click", () => {
  if (validateForm()) {
    loader.style.display = "fixed";
    let data = productData();
    sendData("/add-product", data);
  }
});

const setFormsData = (data) => {
  productName.value = data.name;
  shortLine.value = data.shortDesc;
  desc.value = data.desc;
  link1.value = data.image1;
  link2.value = data.image2;
  link3.value = data.image3;
  link4.value = data.image4;

  showImg();

  stock.value = data.stock;
  use.value = data.use;
  cate.value = data.cate;

  actualPrice.value = data.actualPrice;
  sellingPrice.value = data.sellPrice;
  discountPercentage.value = data.discount;

  addDate = data.addDate;

  manuDate.value = data.manuDate;
  exDate.value = data.exDate;
  perscription.value = data.perscription;
};

const fetchProductData = () => {
  delete sessionStorage.tempProduct;
  fetch("/get-products", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ id: proId }),
  })
    .then((res) => res.json())
    .then((data) => {
      setFormsData(data);
    })
    .catch((_err) => {
      location.replace("/seller");
    });
};

let proDetail = JSON.parse(sessionStorage.tempProduct || null);

if (proId != null) {
  if (proDetail != null) {
    fetchProductData();
  }
}
