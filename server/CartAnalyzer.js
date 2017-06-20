class CartAnalyzer {

    constructor() {
        this.cheerio = require('cheerio');
        this.requiredItems = {
            ramType: "",
            cpuSocket: "",
            cpuFan: true,
            motherboard: true,
            gpu: true,
        };
        this.actualItems = 0;

        this.products = [];
    }


    loadCart(cartUrl) {
        let self = this;
        //Load cart from website
        request(cartUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let $ = this.cheerio.load(response.body);
                $('.cart-content .cart-item').each(function (index) {
                    //Get url for more detailed info
                    let cartItemUrl = $(this).find('.ellipsis').attr('href');

                    // Load more detailed view
                    request(cartItemUrl, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            let $ = this.cheerio.load(response.body);

                            let product = {
                                values: [],
                                name: '',
                                keywords: []
                            }
                            $('.product-tab-specs .row').each(function (index) {
                                product.values.push({key: $(this).find('th'), value: $(this).find('td')});
                            });
                            console.log(product);
                        }
                    });
                });
            }
        });
        cartItemList.forEach(function (cartItem, index) {

           this.decodeItem(cartItem);
        });
    }

    decodeItem() {
        request(cartUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(response.body);
            }
        })
    }

    loadGPU(gpu) {

    }

    loadCPU(cpu) {

    }

    loadMotherBoard(motherboard) {

    }

    loadPSU(psu) {

    }

    analyze() {

    }
}

export default CartAnalyzer;
