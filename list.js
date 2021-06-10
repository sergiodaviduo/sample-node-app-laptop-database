module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');


    function getLaptops(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM laptops INNER JOIN manufacturers on laptops.manufacturerID = manufacturers.manufacturerID", function(error, results, fields){
            no_laptops = 0;
            if(results.length == 0) {
                console.log('no laptops with manufacturers');
                no_laptops = 1;
            }
            else if(error){
                console.log("L request failed");
                res.render('failure', error)
            }
            context.laptops = results;
            console.log(context.laptops);
            complete();
            return no_laptops;
        })
    }

    function getLaptopsNoManu(res, mysql, context, no_laptops, complete){
        mysql.pool.query("SELECT * FROM laptops WHERE manufacturerID IS NULL", function(error, results, fields){
            if(no_laptops === 1 && results.length === 0) {
                console.log('no laptops in database');
            }
            else if(error){
                console.log("L request failed");
                res.render('failure', error)
            }
            context.laptopsNoManu = results;
            complete();
        })
    }

    function getCPUs(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM CPUs INNER JOIN manufacturers on CPUs.manufacturerID = manufacturers.manufacturerID", function(error, results, fields){
            if(error){
                console.log("C request failed");
                res.render('failure', error)
            }
            context.CPUs = results;
            complete();
        });
    }

    function getCPUsNoManu(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM CPUs WHERE manufacturerID IS NULL", function(error, results, fields){
            if(error){
                console.log("C request failed");
                res.render('failure', error)
            }
            context.CPUsNoManu = results;
            complete();
        });
    }    

    function getGraphics(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM graphics INNER JOIN manufacturers ON graphics.manufacturerID = manufacturers.manufacturerID", function(error, results, fields){
            if(error){
                console.log("G request failed");
                res.render('failure', error)
            }
            context.graphics = results;
            complete();
        });
    }

    function getGraphicsNoManu(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM graphics WHERE manufacturerID IS NULL", function(error, results, fields){
            if(error){
                console.log("G request failed");
                res.render('failure', error)
            }
            context.graphicsNoManu = results;
            complete();
        });
    }

    function getManufacturers(res, mysql, context, complete){
        mysql.pool.query("SELECT manufacturerID, manufacturerName FROM manufacturers", function(error, results, fields){
            if(error){
                console.log("M request failed");
                res.render('failure', error);
            }
            context.manufacturers = results;
            complete();
        });
    }

    function getLaptopCPUs(res, mysql, context, complete){
        mysql.pool.query("SELECT laptopName, cpuName FROM laptopCPUs INNER JOIN laptops on laptopCPUs.laptopID = laptops.laptopID INNER JOIN CPUs on laptopCPUs.cpuID = CPUs.cpuID", function(error, results, fields){
            if(error){
                console.log("LC request failed");
                res.render('failure', error)
            }
            context.laptopCPUs = results;
            complete();
        });
    }

    function getLaptopGraphics(res, mysql, context, complete){
        mysql.pool.query("SELECT laptopName, graphicsName FROM laptopGraphics INNER JOIN laptops on laptopGraphics.laptopID = laptops.laptopID INNER JOIN graphics on laptopGraphics.graphicsID = graphics.graphicsID", function(error, results, fields){
            if(error){
                console.log("LG request failed");
                res.render('failure', error)
            }
            context.laptopGraphics = results;
            complete();
        });
    }


    /* List page */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        var no_laptops = 0;
        no_laptops = getLaptops(res, mysql, context, complete);
        if (no_laptops != 1) {
            no_laptops = 0;
        }
        getLaptopsNoManu(res,mysql,context,no_laptops,complete);
        getCPUs(res, mysql, context, complete);
        getCPUsNoManu(res, mysql, context, complete);
        getGraphics(res, mysql, context, complete);
        getGraphicsNoManu(res, mysql, context, complete);
        getManufacturers(res, mysql, context, complete);
        getLaptopGraphics(res, mysql, context, complete);
        getLaptopCPUs(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 9){
                res.render('list', context);
            }
        }
    });


    return router;
}();