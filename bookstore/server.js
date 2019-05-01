// Import requirements
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const engine = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const MongoStore = require('connect-mongo/es5')(session);
const passport = require('passport');


const secret = require('./config/secret');
var User = require('./models/user');

var app = express();

// Connecting to database
mongoose.connect(secret.database, function(err) {
  if (err) console.log(err);
  else console.log("Connected to the database");
});

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({ url: secret.database, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// Setup view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Importing routes
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

// using routes
app.use(mainRoutes);
app.use(userRoutes);

// Make app listen on specefic port
app.listen(secret.port, function(err) {
  if (err) throw err;
  console.log(`Server is Running on port: ${secret.port}`);
});
