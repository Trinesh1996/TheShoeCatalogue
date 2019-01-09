// Dependencies and Modules
const express = require("express"),
    bodyParser = require("body-parser"),
    exphbs = require('express-handlebars'),
    cors = require('cors'), 
    pg = require("pg"),
    Pool = pg.Pool,
    expressValidator = require("express-validator"),
    flash = require("express-flash"),
    session = require("express-session"),
    passport = require("passport"),
    localStrategy = require("passport-local").Strategy




const axios = require('axios')


let StockServices = require('./services/stock');
let CartServices = require('./services/cart')

let stockAPI = require('./api/shoesAPI');
let cartAPI = require('./api/cartAPI');


let userServices = require("./services/user");
let validationRoutes = require("./ValidationRoutes/user");







// init modules, env , port
let app = express(),
    PORT = process.env.PORT || 3015;

// SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true
}

// connect to db
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Trinesh1997@@localhost:5432/shoeCatalogue';

const pool = new Pool({
  connectionString,
  ssl: useSSL
})


// Static files
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

// pool init.
const stockServices = StockServices(pool);
const cartServices = CartServices(pool);

const callShoeStockAPI = stockAPI(stockServices);
const callShoeCartAPI = cartAPI(cartServices);

const UserServices = userServices(pool)
const callUserRoutes = validationRoutes(UserServices)


// middle ware use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

app.set("view engine", "handlebars");
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))




// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());





// Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while (namespace.length) {
      formParam += '[' +  namespace.shift() + "]";
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))



// Cart 

// Add To Cart
app.post('/api/routes/cart/addToCart/:id', callShoeCartAPI.addItemsToCart)

// Filter Cart
app.get('/api/routes/cartAPI/id/:id', callShoeCartAPI.getCartByShoeIDs);
app.get('/api/routes/cartAPI/brand/:cart_brand', callShoeCartAPI.getCartByBrand);
app.get('/api/routes/cartAPI/size/:cart_size', callShoeCartAPI.getCartBySizes);
app.get('/api/routes/cartAPI/cart_color/:cart_color', callShoeCartAPI.getCartByColors);
app.get('/api/routes/ShowCartData', callShoeCartAPI.getRelevantCartData)
app.get('/api/routes/cartAPI', callShoeCartAPI.getCart);





// Admin
app.get('/admin', async function (req, res) {
  let data = await stockServices.getAllShoesByName();

  res.render('admin', {data})
})

app.post("/admin", async function(req, res) {
  let body = req.body;
  await stockServices.addShoeQualities(body.brands,body.size, body.color);
  await stockServices.addShoeItem(body.brands, body.size, body.color, body.price, body.qty, body.imageURL)

  console.log(body)
 res.redirect('admin')
})



// User Registation page
app.get('/user/register', async function (req, res) {
  res.render('userReg')
})

// User Login page

app.get('/login', async function (req, res) {
  res.render('login')
})


app.post('/user/register', callUserRoutes.register)
app.post('/login', callUserRoutes.Handlelogin)
  
 



//   req.checkBody('name', 'Your Full Name is required').notEmpty();
//   req.checkBody('email', 'Email is required').notEmpty();
//   req.checkBody('email', 'Email is not valid').isEmail();
//   req.checkBody('password', "Password is required").notEmpty();
//   req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  

//   let errors = req.validationErrors();

//   if (errors) {
//     console.log(errors)
//     res.render('userReg', {errors})
//   }
//   else {  
//     console.log("Passed")
//   }
  


// Stock
// Add to stock
app.post('/api/routes/shoesAPI/addShoeItem', callShoeStockAPI.addShoeItems);

// Filter Stock
app.get('/api/routes/shoesAPI/brand/:brand', callShoeStockAPI.getShoesByBrand);
app.get('/api/routes/shoesAPI/color/:color', callShoeStockAPI.getShoesByColor);
app.get('/api/routes/shoesAPI/size/:size', callShoeStockAPI.getShoesBySize);
app.get('/api/stock/filter/brands/:brand/colors/:color', callShoeStockAPI.filterByBrandAndColor)
app.get('/api/stock/filter/brands/:brand/sizes/:size', callShoeStockAPI.filterByBrandAndSize)
app.get('/api/stock/filter/colors/:color/sizes/:size', callShoeStockAPI.filterByColorAndSize)
app.get('/api/stock/filter/brands/:brand/colors/:color/sizes/:size', callShoeStockAPI.filterByBrandAndColorAndSize)





app.get('/api/routes/shoesAPI/deleteShoe/:id', callShoeStockAPI.deleteShoeByID);
app.get('/api/routes/shoesAPI/selectedShoe/:id', callShoeStockAPI.showSelectedShoe)
app.get('/api/routes/shoesAPI/id/:id', callShoeStockAPI.getShoesID);
app.get('/api/routes/shoesAPI', callShoeStockAPI.getAvailableShoes);
app.get('/api/routes/shoesAPI/names', callShoeStockAPI.getAvailableShoesByName);


// Filter qualities

app.get('/api/qualities/brand', callShoeStockAPI.getBrands);
app.get('/api/qualities/color', callShoeStockAPI.getColors);
app.get('/api/qualities/size', callShoeStockAPI.getSizes);
app.get('/api/qualities/allQualities', callShoeStockAPI.shoeQualities);



app.listen(PORT, function () {
    console.log('App starting on port', PORT)
  });