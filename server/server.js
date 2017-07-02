var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request =    require('request');
var cheerio = require('cheerio');
var path = require('path');
var cors = require('cors');

import CartAnalyzer from './CartAnalyzer'
import ShoppingFactory from './ShoppingFactory'


//Printers
var printers = [];


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var apiRouter = express.Router();              // get an instance of the express Router
var clientRouter = express.Router();              // get an instance of the express Router

//Allow localhost:3000 to access api
apiRouter.use(cors({origin: 'http://localhost:3000'}));
apiRouter.use(cors({origin: 'inet.hampuscarlsson.se'}));

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
apiRouter.get('/shoppingcart', function(req, res) {

    let cartUrl = 'https://www.inet.se/kundvagn/visa/' + req.query.cartId + '/';
    request(cartUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(response.body);
            let cart = {
                cartURL: cartUrl,
                totalPrice: $('.cart-sum .active-price').html(),
                items: []
            };
            $('.cart-content .cart-item').each(function (index) {
                let item = {};
                item.url = $(this).find('.ellipsis').attr('href');
                item.id = item.url.split('/')[2];
                item.imageUrl = "https://inetimg.se/img/110x83/" + item.id + "_0.jpg";
                item.title =  $(this).find('.ellipsis').html();
                item.price = $(this).find('.product-price .active-price').html()
                cart.items.push(item);
            });
            res.json(cart);
        }else {
            res.status(500).send('Could not find shoppingcart');
        }
    })

});

apiRouter.get('/inkfinder', function(req, res) {
    res.json(printers);
});

apiRouter.get('/cartanalyzer', function(req, res) {
    let cartUrl = 'https://www.inet.se/kundvagn/visa/' + req.query.cartId + '/';
    // let analyzer = new CartAnalyzer();
    let shoppingCart = ShoppingFactory.createShoppingCart(cartUrl);
    let refreshIntervalId = setInterval(function () {
        if(shoppingCart.isLoaded()) {
            shoppingCart.products.forEach(function (product) {
                console.log(product.name + ' : ' + product.type);
            });
            res.json(shoppingCart);
            clearInterval(refreshIntervalId);
        }
    }, 50);
});


//Serve root
clientRouter.get('/', function (req, res) {
    // res.sendFile(__dirname , '..', 'client', 'app.css');
    res.sendFile(path.resolve('client/build/index.html'));
});

//Dirty way to save statics
clientRouter.get(/^(.+)$/, function(req, res) { res.sendfile((path.resolve('client/build/' + req.params[0])))});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);
app.use('/', clientRouter);

// GET PRINTER DATA
let findPrinterBrandsUrl = "https://www.inet.se/kategori/209/blackpatroner";
let printerBrands = [];
request(findPrinterBrandsUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        let $ = cheerio.load(response.body);

        //Get all printer brands
        $('#consumables-brands option').each(function (index) {
            let value = $(this).val();
            // value.replaceAll(' ', '%20');
            if (value != "") {
                printerBrands.push({value: value});
            }
        });

        for (let printerBrand in printerBrands) {
            request('https://www.inet.se/kategori/209/blackpatroner?selectedBrand=' + printerBrands[printerBrand].value + '&search=', function (error, response, body) {
                let $ = cheerio.load(response.body);
                if (!error && response.statusCode == 200) {
                    $('.consumables-printer-list a').each(function (index) {
                        printers.push({
                            title: $(this).html(),
                            brand: printerBrands[printerBrand].value,
                            url: 'https://www.inet.se/kategori/209/blackpatroner' + $(this).attr('href'),
                            id: printers.length
                        });
                    });
                }
            });
        }
    }
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);