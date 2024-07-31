const getSyrups = () => {
  return fetch("/get-products", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cate: "Syrup" }),
  })
    .then((res) => res.json())
    .then((data) => {
      createSyrupsCards(data, ".section2");
    });
};

const createSyrupsCards = (data, parent) => {
  const p = document.querySelector(parent);

  let start = '<div class="product-container1">';
  let middle = "";
  let end = "</div>";

  for (let i = 0; i < data.length; i++) {
    if (data[i].status == "Active") {
      middle += `
                <div class="product-card-home">
                    <div class="product-image-home">
                        <span class="discount-tag-home">${data[i].discount}</span>
                        <img src="${data[i].image1}" class="product-thumb-home" alt="">
                        <button class="card-btn-home" id="card-btn-home">add to wishlist</button>
                    </div>
                    <div class="product-info-home">
                        <a href="/product/${data[i].id}" class="product-brand-home">${data[i].name}</a>
                        <p class="product-short-desc-home">${data[i].shortDesc}</p>
                        <p class="usage1">${data[i].use}</p>
                        <span class="price-home">${data[i].sellPrice}</span>
                        <span class="actual-price-home">${data[i].actualPrice}</span>
                    </div>
                </div>
            `;
    }
  }

  p.innerHTML = start + middle + end;
  setupEventsSyrups(data);
};

const setupEventsSyrups = (data) => {
  const wishlistBtn = document.querySelectorAll("#card-btn-home");

  for (let i = 0; i < data.length; i++) {
    if (wishlistBtn[i]) {
      wishlistBtn[i].addEventListener("click", () => {
        add_to_wishlist(data[i]);
      });
    }
  }
};

getSyrups();
