const add_to_wishlist = (product) => {
    let data = JSON.parse(localStorage.getItem('wishlist'));
    if(data == null){
        data = [];
    }

    var priceInNum = product.sellPrice;
    priceInNum = priceInNum.slice(1);
    priceInNum = parseInt(priceInNum);
    
    product = {
        item: 1,
        name: product.name,
        actualPrice: priceInNum,
        shortDes: product.shortDes,
        image: product.image1,
        quantity: 0
    }

    data.push(product);
    localStorage.setItem('wishlist', JSON.stringify(data));
    return 'added';
}