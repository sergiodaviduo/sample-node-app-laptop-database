module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');

    function getCPUs(res, mysql, context, complete){
        var sql = "SELECT * FROM CPUs"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("cpus request failed");
                res.end();
            }
            context.cpus = results;

            complete();
        });
    }

    function getLaptops(res, mysql, context, complete){
        var sql = "SELECT * FROM laptops"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("laptop  request failed");
                res.end();
            }
            context.laptops = results;

            complete();
        });
    }



    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        getLaptops(res, mysql, context, complete);
        getCPUs(res, mysql, context, complete);

        function complete() {
            callbackCount++
            if(callbackCount >= 2) {
                res.render("add_laptop_cpus", context);
            }
        }
    });


    /*Add cpu to database. */
    router.post('/', function(req, res){
        var sql = "INSERT INTO laptopCPUs (laptopID, cpuID) VALUES (?, ?)";
        var inserts = [req.body.laptopID, req.body.cpuID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("pair insert failed");
                res.render('failure', error)
            } else {
                res.redirect('/list')
            }
        })
    });


    return router;
}();