// Account
const dbconfig = require('../config/database');
const mysql = require('mysql');

module.exports = (app) => {
  app.get('/account', isLoggedIn, ({ user }, res) => {

    const db = mysql.createConnection(dbconfig.connection);
    db.query(`USE ${dbconfig.database};`);
    var q = ['SELECT o.OrderID, o.OrderStatus, o.OrderDate, t.TicketNum, p.PassengerID, p.FirstName, p.LastName, ',
              'p.Gender, f.AirlineCode, f.FlightNum, f.FlightDate, f.Origin, f.DepartTime, f.Destination, f.ArrivalTime, ',
              's.SeatNum, Pricing.Price FROM Orders o ',
              'LEFT JOIN Tickets t ON o.OrderID = t.OrderID ',
              'LEFT JOIN Passengers p ON t.PassengerID = p.PassengerID ',
              'LEFT JOIN Seats s ON s.TicketNum = t.TicketNum ',
              'LEFT JOIN Flights f ON t.AirlineCode = f.AirlineCode AND t.FlightNum = f.FlightNum ',
              'AND t.FlightDate = f.FlightDate AND t.Origin = f.Origin ',
              'LEFT JOIN Pricing ON Pricing.AirlineCode = f.AirlineCode AND Pricing.City = f.Origin ',
              'WHERE Customer_Username = ? ORDER BY o.OrderID DESC'].join('');
    db.query(q, [user.Username],
      function(error, rows, fields) {
        if (error) return console.log(error);
        if (rows.length) {
          res.render('account.ejs', { user, orderHistory: rows});
        } else {
          res.render('account.ejs', {user});
        }
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
