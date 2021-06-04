import * as client from "mysql";

module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');

    function createRefreshQuery(){
        var query = "DROP TABLE IF EXISTS `laptopCPUs`;";
        query += "DROP TABLE IF EXISTS `laptopGraphics`;";
        query += "DROP TABLE IF EXISTS `laptopGraphics`;";
        query += "DROP TABLE IF EXISTS `laptopGraphics`;";
        query += "DROP TABLE IF EXISTS `laptopGraphics`;";

    }

    /* Refresh database 15 minutes after the last edit. */
    router.post('/', function(req, res){
        var callbackCount = 0;
        var context = {};

        // processSQLFile('./database_initialization.sql')
        // function complete() {
        //     callbackCount++
        //     if(callbackCount >= 2) {
        //         res.render("add_laptop_cpus", context);
        //     }
        // }


        var sql = "SELECT * FROM laptops"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("laptop  request failed");
                res.end();
            }
            context.laptops = results;

            complete();
        });

    });


    return router;
}();