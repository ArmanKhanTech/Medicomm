const add_product_to_cart_or_wishlist = (type, product, quan, seller) => {
    let data = JSON.parse(localStorage.getItem(type));
    if(data == null){
        data = [];
    } 

    if(quan == null){
        quan = 1;
    }

    var priceInNum = product.sellPrice;
    priceInNum = priceInNum.slice(1);
    priceInNum = parseInt(priceInNum);

    var quanInNum = parseInt(quan);
    
    for(let i = 0; i < data.length; i++){
        if(data[i].id == product.id){
            return 'already added';
        }
    }

    product = {
        item: 1,
        name: product.name,
        actualPrice: priceInNum,
        shortDes: product.shortDes,
        image: product.image1,
        quantity: quanInNum,
        soldby: seller,
        id: product.id
    }

    data.push(product);
    localStorage.setItem(type, JSON.stringify(data));
    return 'added';
}