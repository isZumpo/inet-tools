var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request =    require('request');
var cheerio = require('cheerio');
var path = require('path');
var cors = require('cors');

import PrinterFactory from './PrinterFactory'
import ShoppingFactory from './ShoppingFactory'


//Printers
let printers = [];


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
if(process.env.ENV_TYPE === 'PRODUCTION') {
    apiRouter.use(cors({origin: 'http://inet.hampuscarlsson.se'}));
} else {
    apiRouter.use(cors({origin: 'http://localhost:3000'}));
}

apiRouter.get('/inkfinder', function(req, res) {
    res.json(printers);
});

apiRouter.get('/shoppingcart', function(req, res) {
    let cartUrl = 'https://www.inet.se/kundvagn/visa/' + req.query.cartId + '/';
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
    res.sendFile(path.resolve('client/build/index.html'));
});

//Dirty way to serve static files
clientRouter.get(/^(.+)$/, function(req, res) { res.sendfile((path.resolve('client/build/' + req.params[0])))});

//Api and client url
app.use('/api', apiRouter);
app.use('/', clientRouter);



// START THE SERVER
// =============================================================================

// Get printer data
printers = PrinterFactory.createPrinterList();

//Start server
app.listen(port);

console.log(process.env.ENV_TYPE);

console.log('Magic happens on port ' + port);