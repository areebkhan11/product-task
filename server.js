const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// Importing routes
const customerRoutes = require('./routes/customerRouter.js');
const productRoutes = require('./routes/productRouter.js');
const orderRoutes = require('./routes/orderRouter.js');

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
app.use(cookieParser());

// Middleware for parsing JSON and URL-encoded query string
app.use(bodyParser.json({
    limit: '50mb',
})); // parse JSON
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
})); // parse URL-encoded bodies
app.use('/customer', customerRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
