const dbconfig = require('../config/database');
const mysql = require('mysql');

module.exports = (app) => {
  app.get('/passengers', (req, res) => {
      // render the page and pass in any flash data if it exists
      if (typeof app.locals.flightResult == 'undefined') {
        res.redirect('/search');
      } else {
        res.render('passengers.ejs');
      }
  });

  app.post('/passengers', (req, res) => {

    console.log(req.body.optradio);
    if (typeof app.locals.flightResult == 'undefined') { res.redirect('/search');}
    app.locals.selectedFlight = app.locals.flightResult[req.body.optradio];
    console.log(app.locals.selectedFlight);
    res.render('passengers.ejs', {flight: app.locals.selectedFlight,
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
