class Product {

    constructor() {
        this.name = undefined;
        this.type = undefined;
        this.values = undefined;
        this.keywords = undefined;
        this.loaded = false;
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


}

export default Product;
