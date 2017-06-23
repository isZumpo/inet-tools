class CartAnalyzer {

    constructor() {
        this.cheerio = require('cheerio');
        this.request = require('request');
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
        this.request(cartUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let $ = self.cheerio.load(response.body);
                $('.cart-content .cart-item').each(function (index) {
                    //Get url for more detailed info
                    let cartItemUrl = "https://www.inet.se" + $(this).find('.ellipsis').attr('href');
                    // Load more detailed view
                    self.request(cartItemUrl, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            let $ = self.cheerio.load(response.body);

                            let product = {
                                values: [],
                                name: '',
                                keywords: []
                            }

                            //Get product name
                            product.name = $('.product-header .ellipsis').text();

                            //Get description info about product
                            $('.product-tab-specs .row').each(function (index) {
                                product.values.push({key: $(this).find('th'), value: $(this).find('td')});
                            });

                            //Get breadcrumbs for product
                            $('.breadcrumb li a span').each(function (index) {
                                product.keywords.push($(this).text());
                            });


                            console.log(product);
                        }
                    });
                });
            }
        });
        // cartItemList.forEach(function (cartItem, index) {
        //
        //    this.decodeItem(cartItem);
        // });
    }

    decodeItem() {
        this.request(cartUrl, function (error, response, body) {
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
