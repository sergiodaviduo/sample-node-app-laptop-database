module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');

    function getLaptops(res, mysql, context, complete){
        var sql = "SELECT * FROM laptopCPUs INNER JOIN laptops on laptopCPUs.laptopID = laptops.laptopID INNER JOIN CPUs on laptopCPUs.cpuID = CPUs.cpuID"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("laptop search request failed");
                res.render('failure', error)
            }
            context.laptops = results;
            complete();
        });
    }

    function getLaptopsByCPU(req, res, mysql, context, complete){
        var sql = "SELECT * FROM laptopCPUs INNER JOIN laptops on laptopCPUs.laptopID = laptops.laptopID INNER JOIN CPUs on laptopCPUs.cpuID = CPUs.cpuID WHERE cpuName = ?"
        var inserts = [req.params.cpu]
        mysql.pool.query(sql,inserts, function(error, results, fields){
            if(error){
                console.log("laptops by cpu search request failed");
                res.render('failure', error)
            }
            context.laptops = results;
            complete();
        });
    }


    function getCPUs(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM CPUs", function(error, results, fields){
            if(error){
                console.log("C request failed");
                res.render('failure', error)
            }
            context.CPUs = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterLaptops.js"]
        var mysql = req.app.get('mysql');

        getLaptops(res, mysql, context, complete)
        getCPUs(res, mysql, context, complete);

        function complete() {
            callbackCount++
            if(callbackCount >= 2) {
                res.render("search_laptops_cpu", context);
            }
        }
    });


    /*Render page with laptops. Requires web based javascript to delete users with AJAX */
    router.get('/:cpu', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterLaptops.js"]
        var mysql = req.app.get('mysql');

        getLaptopsByCPU(req, res, mysql, context, complete);
        getCPUs(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                console.log("sql requests completed")
                res.render('search_laptops_cpu', context);
            }
        }
    });


    return router;
}();