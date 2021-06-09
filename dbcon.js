var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'xxxx',
  user            : 'xxxx',
  password        : 'xxxx',
  database		  : 'xxxx',
  port            : xxxx,
  multipleStatements: true
});

module.exports.pool = pool;
