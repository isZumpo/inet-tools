import Product from './Product.js';


class ShoppingCart {

    constructor(url) {
        this.products = [];
        this.name = undefined;
        this.ready = false;
        this.url = url;
    }

    addProduct(product) {
        this.products.push(product);
    }

    isLoaded() {
        let loaded = this.ready;
        this.products.forEach(function (product) {
            if(!product.isLoaded()) {
                loaded = false;
            }
        });
        return loaded;
    }

    setReady() {
        this.ready = true;
    }

}

export default ShoppingCart;
