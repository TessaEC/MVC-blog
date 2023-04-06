const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// Import Handlebars Helpers
const Handlebars = require('handlebars');
const HandlebarsHelpers = require('handlebars-helpers')({
  handlebars: Handlebars
});
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers: { ...helpers, ...HandlebarsHelpers } });
// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 2400000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    rolling: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// handlebar helper for if/else
Handlebars.registerHelper('eq', function(value1, value2, options) {
  return value1 === value2 ? options.fn(this) : options.inverse(this);
});

// middleware for session
app.use(session(sess));
// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware for parsing JSON and urlencoded form data and static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// sync connection to db, turn on server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});