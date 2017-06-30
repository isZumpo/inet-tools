import Product from './Product.js';
import ShoppingCart from './ShoppingCart.js';


class ShoppingFactory {

    /**
     *
     * @param cartUrl Url to product
     * @returns {ShoppingCart} A empty shoppingcart that gets filled with time(async)
     */
    static createShoppingCart(cartUrl) {
        let cheerio = require('cheerio');
        let request = require('request');

        let shoppingCart = new ShoppingCart(cartUrl);

        //Load cart from website
        request(cartUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(response.body);
                $('.cart-content .cart-item').each(function (index) {
                    //Get url for more detailed info
                    let productUrl = "https://www.inet.se" + $(this).find('.ellipsis').attr('href');
                    shoppingCart.addProduct(ShoppingFactory.createProduct(productUrl));
                });
                shoppingCart.id = (/visa\/(\d+)/g).exec(cartUrl)[1];
                shoppingCart.setReady();
            }
        });



        return shoppingCart;
    }

    /**
     *
     * @param productUrl Url to product
     * @returns {Product} A empty product item that gets filled with time(async)
     */
    static createProduct(productUrl) {
        let cheerio = require('cheerio');
        let request = require('request');

        let product = new Product(productUrl);

        let productTagIndications = {
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
            ],
            'monitor': [
                ['Bildskärm', 'Gaming'],
                ['Bildskärm', 'Standard 15 - 25"'],
                ['Bildskärm', 'Standard 26 - 27"'],
                ['Bildskärm', 'Standard 28" och större']
            ]};

        request(productUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(response.body);

                //Set product name
                product.name = $('.product-header .ellipsis').text();

                //Set product id using regex to get number from url
                product.id = (/produkt\/(\d+)/g).exec(productUrl)[1];

                //Set description info about product
                let values = [];
                $('.product-tab-specs .row').each(function (index) {
                    values.push({key: $(this).find('th').text(), value: $(this).find('td').text()});
                });
                product.values = values;

                //Set price of product, using regex to just get number with kr
                product.price = $('.product-prices .product-price .active-price').text().match(/[0-9][0-9-/\s/g-kr]+/g)[0];

                //Set image of product
                product.image = $('img.img-responsive.center-block').attr('src');

                //Get breadcrumbs/keywords for product
                let keywords = [];
                $('.breadcrumb li a span').each(function (index) {
                    keywords.push($(this).text());
                });

                //Generate type for product, get all keys and iterate through all tags for that product type
                for(let key in productTagIndications) {
                    for(let i = 0; i < productTagIndications[key].length; i++) {
                        for(let j = 0; j < productTagIndications[key][i].length; j++) {

                            //If product tag j does not match with product type tag j, move on
                            if(keywords[j] !== productTagIndications[key][i][j]) {
                                break
                            }

                            //Found a match
                            if(j === productTagIndications[key][i].length - 1) {
                                product.type = key;
                            }
                        }

                    }
                }
                product.setLoaded();
            }
        });

        return product;
    }
}

export default ShoppingFactory;
