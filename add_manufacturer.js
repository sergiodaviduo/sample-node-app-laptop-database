module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');

    router.get('/', function(req, res){
        res.render("add_manufacturer");
    });



    /*Add manufacturer to database. */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body.manufacturerName);
        var sql = "INSERT INTO manufacturers (manufacturerName) VALUES (?)";
        var inserts = [req.body.manufacturerName];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("manufacturer insert failed");
                res.render('failure', error)
            } else {
                res.redirect('/list')
            }
        });
    });


    return router;
}();