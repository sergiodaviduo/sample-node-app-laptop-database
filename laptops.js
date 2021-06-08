module.exports = function(){
	var express = require('express');
    var router = express.Router();
    var mysql = require('./dbcon.js');

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

    function getManufacturers(res, mysql, context, complete){
        var sql = "SELECT * FROM manufacturers";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                console.log("laptop search request failed");
                res.render('failure', error);
            }
            // give app the results of the query to be displayed in handlebars
            context.manufacturer = results;

            complete();
        });
    }

    router.get('/update', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        getLaptops(res, mysql, context, complete);
        getManufacturers(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if(callbackCount >= 2) {
                res.render("update_laptop", context);
            }
        }
    });

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');

        getManufacturers(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if(callbackCount >= 1) {
                res.render("add_laptop", context);
            }
        }
    });

	  /* Add (insert) laptop */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var null_val = "NULL";
        var manufacturer = "?";
		var insert = [req.body.laptopName, req.body.laptopManu, req.body.laptopRAM, req.body.laptopStorage, req.body.laptopPDF];
        if(req.body.laptopManu == "default"){
            manufacturer = null_val;
		    insert = [req.body.laptopName, req.body.laptopRAM, req.body.laptopStorage, req.body.laptopPDF];
        }
		// now insert laptop with new manufacturer id
		var queryLaptop = "INSERT INTO laptops (laptopName, manufacturerID, ram, storageAmount, pdfLINK)" +
			  "VALUES (?,"+manufacturer+",?,?,?)";
		console.log(req.body.laptopName);
		queryLaptop = mysql.pool.query(queryLaptop,insert,function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			}else{
				res.redirect('/list');
			}
		});
    });


	
	router.post('/update', function(req, res){
		var mysql = req.app.get('mysql');
    var null_val = "NULL";
    var manufacturer = "?";
		var insert = [req.body.laptopName, req.body.laptopManu, req.body.laptopRAM, req.body.laptopStorage, req.body.laptopPDF, req.body.laptopNameSelect];
    if(req.body.laptopManu == "default") {
      manufacturer = null_val;
		  insert = [req.body.laptopName, req.body.laptopRAM, req.body.laptopStorage, req.body.laptopPDF, req.body.laptopNameSelect];
    }
		// now insert laptop with new manufacturer id
		var queryLaptop = "UPDATE laptops SET laptopName=?,manufacturerID="+manufacturer+",ram=?,storageAmount=?,pdfLINK=? WHERE laptopName=?";
		console.log(req.body.laptopName);
		queryLaptop = mysql.pool.query(queryLaptop,insert,function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			}else{
				res.redirect('/list');
			}
		});
	});


    return router;
}();
