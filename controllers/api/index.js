const router = require('express').Router();

const homepageRoute = require('../homepageRoute');
const dashboardRoute = require('./dashboardRoute');
const blogRoute = require('./blogRoute');
const commentRoute = require('./commentRoute');
const userRoute = require('./userRoute');

router.use('/homepage', homepageRoute);
router.use('/dashboard', dashboardRoute);
router.use('/blog', blogRoute);
router.use('/comment', commentRoute);
router.use('/user', userRoute);

router.use((req, res) => {
  res.status(404).send("<h1>Wrong Route!</h1>")
});



module.exports = router;