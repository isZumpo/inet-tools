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



        this.productTagIndications = {
            'gpu' : [
                ['Datorkomponenter', 'Grafikkort / GPU', 'AMD Radeon'],
                ['Datorkomponenter', 'Grafikkort / GPU', 'Beräkningskort', 'Quadro'],
                ['Datorkomponenter', 'Grafikkort / GPU', 'GeForce GT'],
                ['Datorkomponenter', 'Grafikkort / GPU', 'GeForce GTX Gaming'],
            ],
            'cpu': [
                ['Datorkomponenter', 'Processor / CPU' ,'AMD'],
                ['Datorkomponenter', 'Processor / CPU' ,'Intel']
            ],
            'psu': [
                ['Datorkomponenter', 'Nätdel / PSU']
            ],
            'motherboard': [
                ['Datorkomponenter', 'Moderkort', 'För AMD-processor'],
                ['Datorkomponenter', 'Moderkort', 'För Intel-processor'],
                ['Datorkomponenter', 'Moderkort', 'Integrerad CPU (SoC)'],
            ],
            'hdd': [
                ['Datorkomponenter', 'Hårddisk SSD', '2.5" SATA'],
                ['Datorkomponenter', 'Hårddisk SSD', 'M.2'],
                ['Datorkomponenter', 'Hårddisk SSD', 'mSATA'],
                ['Datorkomponenter', 'Hårddisk SSD', 'Övriga'],
                ['Datorkomponenter', 'Hårddisk Mekanisk', '2.5" Bärbar'], // Hårddisk Mekanisk might contain a space at the end
                ['Datorkomponenter', 'Hårddisk Mekanisk', '3.5" Stationär'],
            ],
            'ram': [
                ['Datorkomponenter', 'Internminne / RAM', 'Till stationär'],
            ],
            'cpufan': [
                ['Datorkomponenter', 'Kylning / Moddning', 'Processorkylning'],
            ],
            'case': [
                ['Datorkomponenter', 'Datorlåda / Chassi', 'ATX'],
                ['Datorkomponenter', 'Datorlåda / Chassi', 'mATX'],
                ['Datorkomponenter', 'Datorlåda / Chassi', 'mITX'],
                ['Datorkomponenter', 'Datorlåda / Chassi', 'Server'],

            ]

        }

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
                            };

                            //Get product name
                            product.name = $('.product-header .ellipsis').text();

                            //Get description info about product
                            $('.product-tab-specs .row').each(function (index) {
                                product.values.push({key: $(this).find('th'), value: $(this).find('td')});
                            });

                            //Get breadcrumbs/keywords for product
                            $('.breadcrumb li a span').each(function (index) {
                                product.keywords.push($(this).text());
                            });


                            self.products.push(product);
                            console.log("IS NOW: "  + self.products.length);
                        }
                    });
                });
            }
        });


        //TODO move this into a function
        setTimeout(function () {
            //Go through each product and identify which type it is
            self.products.forEach(function (product) {
                //Get all keys and iterate through all tags for that product type
                for(let key in self.productTagIndications) {
                    for(let i = 0; i < self.productTagIndications[key].length; i++) {
                        for(let j = 0; j < self.productTagIndications[key][i].length; j++) {

                            //If product tag j does not match with product type tag j, move on
                            if(product.keywords[j] !== self.productTagIndications[key][i][j]) {
                                break
                            }

                            //Found a match
                            if(j === self.productTagIndications[key][i].length - 1) {
                                console.log(key);
                            }
                        }

                    }
                }
            })
        }, 6000);

    }

    decodeItems() {
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
