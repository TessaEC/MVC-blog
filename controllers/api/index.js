const router = require('express').Router();

const dashboardRoute = require('./dashboardRoute');
const user = require('./userRoute');

router.use('/dashboard', dashboardRoute);
router.use('/userRoute', user);

router.use((req, res) => {
  res.status(404).send("<h1>Wrong Route!</h1>")
});

module.exports = router;