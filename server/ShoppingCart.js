import Product from './Product.js';


class ShoppingCart {

    constructor() {
        this.products = [];
        this.name = undefined;
        this.ready = false;
    }

     getProducts() {
        return this.products;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
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
