const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
    <div class="nav">
    <img src="../images/headerlogo.png" class="brand-logo" alt="">
    <div class="nav-items">
        <div class="search">
            <input type="text" class="search-box" placeholder="Search Medicines, Categories, Diagnoses">
            <button class="search-btn">search</button>
        </div>
        <a>
            <img src="../images\\user.png" id="user-img" alt="">
            <div class="login-logout-popup hide">
                <p class="account-info1">Logged-in as, Name</p>
                <button class="btn1" id="user-btn">Log Out</button>
            </div>
        </a>         
        <a href="/cart.html"><img src="../images\\cart.png" id="cart-img" alt=""></a>
    </div>
    </div>
    <ul class="links-container">
        <li class="link-item"><a href="/index.html" class="link">home</a></li>
        <li class="link-item"><a href="/search.html" class="link">buy</a></li>
        <li class="link-item"><a href="/seller.html" class="link">sell</a></li>
        <li class="link-item"><a href="#" class="link">Articles</a></li>
        <li class="link-item"><a href="#" class="link">Reviews</a></li>
        <li class="link-item"><a href="#" class="link">about</a></li>
        <li class="link-item"><a href="#" class="link">contact</a></li>
    </ul>
    `;
}

createNav();

//nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popupText = document.querySelector('.account-info1');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide')
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
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
}

const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');

searchBtn.addEventListener('click', () => {
    if(searchBox.value.length){
        location.href = `/search/${searchBox.value}`;
    }
})