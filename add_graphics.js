module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');

    function getManufacturers(res, mysql, context, complete){
        var sql = "SELECT * FROM manufacturers"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("laptop search request failed");
                res.render('failure', error)
            }
            context.manufacturer = results;

            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        getManufacturers(res, mysql, context, complete);

        function complete() {
            callbackCount++
            if(callbackCount >= 1) {
                res.render("add_graphics", context);
            }
        }
    });

    /*Add cpu to database. */
    router.post('/', function(req, res){
        var sql = "INSERT INTO graphics (graphicsName, dedicatedMem, manufacturerID) VALUES (?, ?, ?)";
        var inserts = [req.body.graphicsName, req.body.dedicatedMem, req.body.manufacturerID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("graphics insert failed");
                res.render('failure', error)
            } else {
                res.redirect('/list')
            }
        })
    });


    return router;
}();