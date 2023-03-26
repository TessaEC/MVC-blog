const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoute = require('./homepageRoute');
const dashboardRoute = require('./dashboardRoute');

router.use('/', homepageRoute);
router.use('/api/', apiRoutes);
router.use('/dashboard', dashboardRoute);

module.exports = router;