var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_urrutise',
  password        : 'i9zhlb5cMALtgSAP',
  database		  : 'cs340_urrutise'
});

module.exports.pool = pool;
