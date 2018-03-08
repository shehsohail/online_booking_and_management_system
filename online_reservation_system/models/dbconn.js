

const mysql = require('mysql');
const con = mysql.createConnection({
  host: "onlinereservationsystem.ca7z4fcwtf2l.us-east-2.rds.amazonaws.com",
  user: "webadmin",
  password: "finalproject336",
  database: "online_booking_and_management_system"
});

con.connect((err) => {
  if (err) throw err;
  else console.log('Database Connected.');
});

con.end ((err) => {
  if (err) throw err;
  else console.log('Database Disconnected.');
});
