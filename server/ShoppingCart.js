import Product from './Product.js';


class ShoppingCart {

    constructor() {
        this.products = [];
        this.name = undefined;
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
        let isLoaded = true;
        this.products.forEach(function (product) {
            if(!product.isLoaded) {
                isLoaded = false;
            }
        });
        return isLoaded;
    }

}

export default ShoppingCart;
