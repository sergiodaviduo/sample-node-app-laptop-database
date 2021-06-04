var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user            : 'lonpn44yqes1yd2f',
  password        : 'i9zhlb5cMALtgSAP',
  database		  : 'hwd2rv3rct4ydx4j',
  port            : 3306
});

module.exports.pool = pool;
