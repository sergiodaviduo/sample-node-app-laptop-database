module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');

    function getGraphics(res, mysql, context, complete){
        var sql = "SELECT * FROM graphics"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("graphics request failed");
                res.render('failure', error)
            }
            context.graphics = results;

            complete();
        });
    }

    function getLaptops(res, mysql, context, complete){
        var sql = "SELECT * FROM laptops"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("laptop  request failed");
                res.render('failure', error)
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
        getGraphics(res, mysql, context, complete);

        function complete() {
            callbackCount++
            if(callbackCount >= 2) {
                res.render("add_laptop_graphics", context);
            }
        }
    });


    /*Add cpu to database. */
    router.post('/', function(req, res){
        var sql = "INSERT INTO laptopGraphics (laptopID, graphicsID) VALUES (?, ?)";
        var inserts = [req.body.laptopID, req.body.graphicsID];
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