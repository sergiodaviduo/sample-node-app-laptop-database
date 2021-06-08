module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');

    /* Get all the laptops currently in the database */
    function getLaptops(res, mysql, context, complete){
        var sql = "SELECT * FROM laptops"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("laptop  request failed");
                res.render('failure', context)
            }
            context.laptops = results;

            complete();
        });
    }

    function deleteLaptop(res, mysql, finished_deletion, inserts){
        var sql = "DELETE FROM laptops WHERE laptopID = ?"
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("delete laptop request failed");
                res.render('failure', error)
            }

            finished_deletion();
        });
    }

    function deleteLaptopCPUs(res, mysql, complete, inserts){
        var sql = "DELETE FROM laptopCPUs WHERE laptopID = ?"
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("delete laptop cpus request failed");
                res.render('failure', error)
            }

            complete();
        });
    }

    function deleteLaptopGraphics(res, mysql, complete, inserts){
        var sql = "DELETE FROM laptopGraphics WHERE laptopID = ?"
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("delete laptop gpus request failed");
                res.render('failure', error);
            }
            complete();
        });
    }

    /* Load delete laptop page */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        getLaptops(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if(callbackCount >= 1) {
                res.render("delete_laptop", context);
            }
        }
    });


    /* Delete laptop. */
    router.post('/', function(req, res){
        var callbackCount = 0;
        var deletion_counter = 0;

        var mysql = req.app.get('mysql');

        var inserts = [req.body.laptopID];
        console.log(req.body.laptopID)
        
        deleteLaptopGraphics(res,mysql,complete,inserts);
        deleteLaptopCPUs(res,mysql,complete,inserts);

        function complete() {
            callbackCount++
            if (callbackCount >= 2) {
                deleteLaptop(res,mysql,finished_deletion,inserts);
            }
        }

        function finished_deletion() {
            deletion_counter++
            if (deletion_counter >= 1) {
                res.redirect('/list');
            }
        }

    });


    return router;
}();