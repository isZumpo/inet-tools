var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request =    require('request');
var cheerio = require('cheerio');
var path = require('path');
var cors = require('cors');


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
            res.json({ message: 'NADA' });
        }
    })

});


//Serve root
clientRouter.get('/', function (req, res) {
    // res.sendFile(__dirname , '..', 'client', 'app.css');
    res.sendFile(path.resolve('../client/build/index.html'));
});

//Dirty way to save statics
clientRouter.get(/^(.+)$/, function(req, res) { res.sendfile((path.resolve('../client/build/' + req.params[0])))});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);
app.use('/', clientRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);