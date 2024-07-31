const getAllProducts = (tac) => {
  fetch("/get-all-products", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tac: tac }),
  })
    .then((res) => res.json())
    .then((data) => {
      discardProduct(data);
    });
};

const disableProduct = (id, status) => {
  let data = {
    id: id,
    status: status,
  };

  fetch("/toggle-product", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ data: data }),
  })
    .then((res) => res.json())
    .then((_data) => {});
};

const discardProduct = (data) => {
  for (let i = 0; i < data.length; i++) {
    var date = new Date(data[i].exDate);
    var currentDate = new Date();

    if (data[i].stock == 0) {
      disableProduct(data[i].id, "Out of Stock");
    } else if (date < currentDate) {
      disableProduct(data[i].id, "Expired");
    }
  }
};

const createNav = () => {
  let nav = document.querySelector(".navbar");

  nav.innerHTML = `
        <div class="nav">
            <img src="../images/headerlogo.png" class="brand-logo" alt="">
            <div class="nav-items">
                <div class="search">
                    <input type="text" class="search-box" placeholder="Search Medicines, Categories, Diagnoses">
                    <button class="search-btn">search</button>
                </div>
                <a>
                    <img src="../images/user.png" id="user-img" alt="">
                    <div class="login-logout-popup hide">
                        <p class="account-info">Logged-in as, Name</p>
                        <button class="btn" id="user-btn">Log Out</button>
                    </div>
                </a>         
                <a href="/html/cart.html">
                    <img src="../images/cart.png" id="cart-img" alt="">
                </a>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-item"><a href="/html/index.html" class="link">home</a></li>
            <li class="link-item"><a href="/html/search.html" class="link">buy</a></li>
            <li class="link-item"><a href="/html/seller.html" class="link">sell</a></li>
            <li class="link-item"><a href="/html/order.html" class="link">Orders</a></li>
            <li class="link-item"><a href="/html/about.html" class="link">about</a></li>
            <li class="link-item"><a href="/html/contact.html" class="link">contact</a></li>
        </ul>
    `;
};

createNav();

const userImageButton = document.querySelector("#user-img");
const userPopup = document.querySelector(".login-logout-popup");
const popupText = document.querySelector(".account-info");
const actionBtn = document.querySelector("#user-btn");

userImageButton.addEventListener("click", () => {
  userPopup.classList.toggle("hide");
});

window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);
  if (user != null) {
    popupText.innerHTML = `Logged-in as, ${user.name}`;
    actionBtn.innerHTML = "Log-Out";
    actionBtn.addEventListener("click", () => {
      sessionStorage.clear();
      location.reload();
    });
  } else {
    popupText.innerHTML = "Log-In to Place Order";
    actionBtn.innerHTML = "Log-In";
    actionBtn.addEventListener("click", () => {
      location.href = "/login";
    });
  }

  getAllProducts(true);
};

const searchBtn = document.querySelector(".search-btn");
const searchBox = document.querySelector(".search-box");

searchBtn.addEventListener("click", () => {
  if (searchBox.value.length) {
    location.href = `/search/${searchBox.value}`;
  }
});
