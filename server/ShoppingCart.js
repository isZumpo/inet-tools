class ShoppingCart {

    constructor(url) {
        this.products = [];
        this.name = undefined;
        this.id = undefined;
        this.ready = false;
        this.url = url;
        this.totalPrice = undefined;
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
