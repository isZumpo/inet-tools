import Product from './Product.js';


class ShoppingCart {

    constructor() {
        this.products = [];
    }

     getProducts() {
        return this.products;
    }

    addProduct(product) {
        console.log(product);
        this.products.push(product);
    }

}

export default ShoppingCart;
