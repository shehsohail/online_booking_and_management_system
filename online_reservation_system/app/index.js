const dbconfig = require('../config/database');
const mysql = require('mysql');
var moment = require('moment');

module.exports = (app) => {
  // Homepage
  app.get('/', (req, res) => {
    var date= moment();
    var dateNow = '2018-04-01';//date.format('YYYY-MM-DD');
    var timeNow = '2100';//date.format('HHmm');
    const db = mysql.createConnection(dbconfig.connection);
    db.query(`USE ${dbconfig.database};`);
    var q = ['SELECT AirlineCode, FlightNum, o.City, o.State, Origin, DepartTime, ',
              'd.City as destCity, d.State as destState, Destination, ArrivalTime FROM Flights ',
              'INNER JOIN Airports as o ON Flights.Origin = o.Airport_Code ',
              'INNER JOIN Airports as d ON Flights.Destination = d.Airport_Code ',
              'WHERE FlightDate = ? AND Flights.DepartTime >= ? ',
              'ORDER BY Flights.DepartTime LIMIT 10;'].join('');
    db.query(q, [dateNow, timeNow],
      function(error, rows, fields) {
        if (error) return console.log(error);
        if (!rows.length) {
          console.log("No flights returned.")
        } else {
          res.render('index.ejs', { upcomingFlights: rows });
      }
    });
    db.close;
  })

}
