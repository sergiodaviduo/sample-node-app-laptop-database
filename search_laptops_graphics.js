module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');

    function getLaptops(res, mysql, context, complete){
        var sql = "SELECT * FROM laptopGraphics INNER JOIN laptops on laptopGraphics.laptopID = laptops.laptopID INNER JOIN graphics on laptopGraphics.graphicsID = graphics.graphicsID"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("laptop search request failed");
                res.render('failure', error)
            }
            context.laptops = results;
            complete();
        });
    }

    function getLaptopsByGraphics(req, res, mysql, context, complete){
        var sql = "SELECT * FROM laptopGraphics INNER JOIN laptops on laptopGraphics.laptopID = laptops.laptopID INNER JOIN graphics on laptopGraphics.graphicsID = graphics.graphicsID WHERE graphicsName = ?"
        console.log(req.params)
        var inserts = [req.params.graphics]
        mysql.pool.query(sql,inserts, function(error, results, fields){
            if(error){
                console.log("laptops by graphics search request failed");
                res.render('failure', error)
            }
            context.laptops = results;
            complete();
        });
    }


    function getGraphics(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM graphics", function(error, results, fields){
            if(error){
                console.log("C request failed");
                res.render('failure', error)
            }
            context.graphics = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterLaptops.js"]
        var mysql = req.app.get('mysql');

        getLaptops(res, mysql, context, complete)
        getGraphics(res, mysql, context, complete);

        function complete() {
            callbackCount++
            if(callbackCount >= 2) {
                res.render("search_laptops_graphics", context);
            }
        }
    });


    /*Render page with laptops. */
    router.get('/:graphics', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterLaptops.js"]
        var mysql = req.app.get('mysql');

        getLaptopsByGraphics(req, res, mysql, context, complete);
        getGraphics(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                console.log("sql requests completed")
                res.render('search_laptops_graphics', context);
            }
        }
    });


    return router;
}();