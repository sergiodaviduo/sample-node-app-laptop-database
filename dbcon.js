var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user            : 'lonpn44yqes1yd2f',
  password        : 't8y8epetuly8je4m',
  database		  : 'hwd2rv3rct4ydx4j',
  port            : 3306,
  multipleStatements: true
});

module.exports.pool = pool;
