class Product {

    constructor() {
        this.name = undefined;
        this.type = undefined;
        this.values = undefined;
        this.keywords = undefined;
        this.isLoaded = false;
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
        this.isLoaded = true;
    }

    isLoaded() {
        return this.isLoaded;
    }


}

export default Product;
