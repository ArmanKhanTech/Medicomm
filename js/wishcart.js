const add_product_to_cart_or_wishlist = (type, product, quan) => {
    let data = JSON.parse(localStorage.getItem(type));
    if(data == null){
        data = [];
    } 

    if(quan == null){
        quan = 1;
    }

    product = {
        item: 1,
        name: product.name,
        actualPrice: product.actualPrice,
        shortDes: product.shortDes,
        image: product.image1,
        quantity: quan
    }

    data.push(product);
    localStorage.setItem(type, JSON.stringify(data));
    return 'added';
}