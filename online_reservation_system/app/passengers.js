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

    // console.log(req.body.optradio);
    if (typeof app.locals.flightResult == 'undefined') { res.redirect('/search');}
    app.locals.selectedFlight = app.locals.flightResult[req.body.optradio];
    console.log(app.locals.selectedFlight);

    var seatingArray=new Array(21);
    seatingArray.fill("0",0,21);
    const db = mysql.createConnection(dbconfig.connection);
    db.query(`USE ${dbconfig.database};`);
    var q = 'SELECT SeatNum FROM Seats LEFT JOIN Tickets ON Seats.TicketNum = Tickets.TicketNum WHERE AirlineCode = ? AND FlightNum = ? AND FlightDate = ? AND Origin = ?;'
    db.query(q, [app.locals.selectedFlight.AirlineCode, app.locals.selectedFlight.FlightNum, app.locals.selectedFlight.FlightDate, app.locals.selectedFlight.Origin],
      function(error, rows, fields) {
        if (error) return console.log(error);
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          seatingArray[rows[i].SeatNum] = 1;
        }
        console.log(seatingArray);
        res.render('passengers.ejs', {flight: app.locals.selectedFlight,
          passengers: app.locals.passengers,
          classSelected: app.locals.class,
          seat: seatingArray});
      });
      db.close;
  });
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
