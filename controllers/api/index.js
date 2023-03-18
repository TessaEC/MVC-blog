const router = require('express').Router();
const homepage = require('./homepageRoute');
const dashboard = require('./dashboardRoute');
const login = require('./loginRoute');
const signup = require('./signupRoute');

router.use('/homepage', homepage);
router.use('/dashboard', dashboard);
router.use('/login', login);
router.use('/signup', signup);

module.exports = router;