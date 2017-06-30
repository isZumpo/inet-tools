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

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getValues() {
        return this.values;
    }

    setName(name) {
        this.name = name;
    }

    setType(type) {
        this.type = type;
    }

    setValues(values) {
        this.values = values;
    }

    setLoaded() {
        this.loaded = true;
    }

    isLoaded() {
        return this.loaded;
    }

    setPrice(price) {
        this.price = price;
    }

    setImage(image) {
        this.image = image;
    }

    setId(id) {
        this.id = id;
    }


}

export default Product;
