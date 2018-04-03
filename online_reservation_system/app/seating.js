const dbconfig = require('../config/database');
const mysql = require('mysql');

module.exports = (app) => {
  // Seating
  app.get('/seating', (req, res) => {
      res.render('seating.ejs');
  });

  app.post('/seating', (req, res) => {
    console.log(req.body);
    app.locals.passengerInfo = req.body;
    console.log(req.body.firstname[0]);
    console.log(app.locals.passengerInfo.firstname[0])
    console.log(app.locals.passengers);
    res.render('seating.ejs');


  });
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
