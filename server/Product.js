class Product {

    constructor(url) {
        this.name = undefined;
        this.id = undefined;
        this.type = undefined;
        this.values = undefined;
        this.keywords = undefined;
        this.loaded = false;
        this.price = undefined;
        this.url = url;
        this.image = undefined;
    }
    setLoaded() {
        this.loaded = true;
    }

    isLoaded() {
        return this.loaded;
    }


}

export default Product;
