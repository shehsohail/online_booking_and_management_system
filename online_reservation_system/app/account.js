// Account
const dbconfig = require('../config/database');
const mysql = require('mysql');

module.exports = (app) => {
  app.get('/account', isLoggedIn, ({ user }, res) => {
    console.log("account");
    var nextFlight;
    var orderHistory;

    const db = mysql.createConnection(dbconfig.connection);
    db.query(`USE ${dbconfig.database};`);
    var q = 'SELECT * FROM Orders WHERE Customer_Username = ?'
    db.query(q, [user.Username],
      function(error, rows, fields) {
        if (error) return console.log(error);
        if (rows.length) {
          console.log(rows);
          res.render('account.ejs', { user, orderHistory: rows});
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
