var mysql = require('mysql')

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "hoslia40",
    database: "employeeschema",
  });
  

db.connect();

module.exports = db;