
const mysql = require('mysql');
var connect =mysql.createConnection( {
  host: 'localhost',
  user: 'root',
  password: "",
  database: 'bank_transaction',  
});

connect.connect( (err) => {
    if (err) throw err;
    console.log("My database connected");
});

module.exports = connect;