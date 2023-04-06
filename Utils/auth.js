const withAuth = (req, res, next) => { // check to see if my current session is logged in
    if (!req.session.logged_in) {
      res.redirect('/');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;