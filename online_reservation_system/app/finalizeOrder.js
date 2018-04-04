const dbconfig = require('../config/database');
const mysql = require('mysql');
var shortid = require('shortid');

function finalizeOrder() {
  const db = mysql.createConnection(dbconfig.connection);
  db.query(`USE ${dbconfig.database};`);
  var
  var q = ['INSERT INTO Orders ',
            'VALUES (?, ?, ?, ?);'].join('');

  for (var i = 0; var < app.locals.passengers; i++) {
    q = ['INSERT INTO Passengers ',
              'VALUES (?, ?, ?, ?, ?);'].join('');
    var passengerID = shortid.generate();

    db.query(q, [], function(error, rows, fields) {
      if (!rows.length) {console.log(error);}
      else {
        q = ['INSERT INTO Tickets ',
                  'VALUES (?, ?, ?, ?, ?, ?, ?);'].join('');
        var ticketNum = shortid.generate();
        db.query(q, [ticketNum, app.locals.selectedFlight.AirlineCode, app.locals.selectedFlight.FlightNum,
                    app.locals.selectedFlight.FlightNum, app.locals.selectedFlight.FlightDate, app.locals.selectedFlight.Origin,
                    orderID, passengerID], function(error, rows, fields) {

                    });
      }
    });
  }
  db.close;
}
