const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var morgan = require('morgan');
//parse appliction/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
//get routes
var routes = require('./routers/routes');
routes(app);

//create menu routes in index
app.use('/auth', require('./middleware'));

app.listen(5000, () => {
  console.log(`Server started on port`);
});
