// app/confirmation.js
const dbconfig = require('../config/database');
const mysql = require('mysql');

module.exports = (app) => {
  app.get('/confirmation', (req, res) => {
      res.render('confirmation.ejs');
  });

  app.post('/confirmation', (req, res) => {
    console.log(app.locals.passengerInfo);
    console.log(app.locals.selectedFlight);
  

    res.render('confirmation.ejs', {flight: app.locals.selectedFlight,
      passengers: app.locals.passengers,
      passengersInfo: app.locals.passengerInfo,
      classSelected: app.locals.class,
      seat: seatingArray});
  });
}





function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
