const dbconfig = require('../config/database');
const mysql = require('mysql');

module.exports = (app) => {
  app.get('/order', isLoggedIn, (req, res) => {
      // render the page and pass in any flash data if it exists
      if (typeof app.locals.flightResult == 'undefined') {
        res.redirect('/search');
      } else {
        res.render('order.ejs');
      }
  });

  app.post('/order', isLoggedIn, (req, res) => {

    console.log(req.body.optradio);
    if (typeof app.locals.flightResult == 'undefined') { res.redirect('/search');}
    console.log(app.locals.flightResult[req.body.optradio]);
    res.render('order.ejs', {flight: app.locals.flightResult[req.body.optradio],
                              passengers: app.locals.passengers,
                              classSelected: app.locals.class});
  });
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
