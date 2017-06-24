class Product {

    constructor(name, type, values, keywords) {
        this.name = name;
        this.type = type;
        this.values = values;
        this.keywords = keywords;
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


}

export default Product;
