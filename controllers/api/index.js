const router = require('express').Router();

const dashboardRoute = require('./dashboardRoute');
const userRoute = require('./userRoute');

router.use('/dashboard', dashboardRoute);
router.use('/user', userRoute);

router.use((req, res) => {
  res.status(404).send("<h1>Wrong Route!</h1>")
});

module.exports = router;