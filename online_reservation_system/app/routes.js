// app/routes.js

const dbconfig = require('../config/database');
const mysql = require('mysql');

module.exports = (app, passport) => {



    // Search
    app.get('/search', (req, res) => {
        // render the page and pass in any flash data if it exists
        res.render('search.ejs');
    });

    app.get('/order', (req, res) => {
        // render the page and pass in any flash data if it exists
        if (typeof app.locals.flightResult == 'undefined') {
          res.redirect('/search');
        } else {
          res.render('order.ejs');
        }
    });

    app.post('/order', (req, res) => {

      console.log(req.body.optradio);
      if (typeof app.locals.flightResult == 'undefined') { res.redirect('/search');}
      console.log(app.locals.flightResult[req.body.optradio]);
      res.render('order.ejs', {flight: app.locals.flightResult[req.body.optradio]});
    });

    app.post('/search', (req, res) => {
      var flightRequest = {
        Origin: req.body.Origin,
        Destination: req.body.Destination,
        DepartDate: req.body.date
      };
      const db = mysql.createConnection(dbconfig.connection);
      db.query(`USE ${dbconfig.database};`);
      var q = 'SELECT * FROM Flights WHERE Origin = ? AND Destination = ? AND FlightDate = ? ORDER BY DepartTime'
      db.query(q, [flightRequest.Origin, flightRequest.Destination, flightRequest.DepartDate],
        function(error, rows, fields) {
          if (error) return console.log(error);
          if (!rows.length) {
            console.log("No flights returned.")
          } else {
            app.locals.flightResult = rows;
            res.render('search.ejs', { flights: rows });
        }
      });
      db.close;
    })
    // Login
    app.get('/login', (req, res) => {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/account', // redirect to the secure account section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true, // allow flash messages
    }), ({ body, session }, res) => {
        console.log('hello');

        if (body.remember) {
            session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            session.cookie.expires = false;
        }
        res.redirect('/');
    });

    // Signup
    app.get('/signup', (req, res) => {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/account', // redirect to the secure account section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true, // allow flash messages
    }));

    // Account
    app.get('/account', isLoggedIn, ({ user }, res) => {
        res.render('account.ejs', {
            user, // get the user out of session and pass to template
        });
    });

    // Seating
    app.get('/seating', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('seating.ejs');

    //connect to the database
    const db = mysql.createConnection(dbconfig.connection);
    db.query(`USE ${dbconfig.database};`);
    var qu = 'SELECT SeatNum FROM Seats WHERE SeatAvailability=0'
    db.query(qu,function(error,rows,fields) {
        if (error) return console.log(error);
        if (!rows.length) {
              console.log("All seats are available.")
              } else {
                console.log(rows);
              }
      });

    db.close
});


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
