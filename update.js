module.exports = function(){
	var express = require('express');
    var router = express.Router();

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');

        // have to add new manufacturer first to manu entity b4 adding laptop
	  	// sql for add/insert manufacturer
	  	var queryManu = "INSERT INTO manufacturers (manufacturerName) "+
			"SELECT (?) WHERE NOT EXISTS(SELECT manufacturerID FROM manufacturers WHERE manufacturerName = (?))";

		// sql for get id from new manufacturer
		var queryGetManu = "SELECT manufacturerID FROM manufacturers WHERE manufacturerName = (?)";

		var nameManu = [req.body.laptopManu,req.body.laptopManu];
		var nameGet = [req.body.laptopManu];
		var manuID = 0;

		// insert manu
		queryManu = mysql.pool.query(queryManu,nameManu,function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              console.log("error: "+error);
              res.end();
			}
		});

        // get manu ID
		queryGetManu = mysql.pool.query(queryGetManu,nameGet,function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				console.log("error: "+error);
				res.end();
			}
			manuID = results[0].manufacturerID;

	        var queryLaptop = "UPDATE laptops "+
	        "SET laptopName=?,manufacturerID=?,ram=?,storageAmount=?,pdfLINK=? "+
	        "WHERE laptopName=?";
	        var insert = [req.body.laptopName, manuID, req.body.laptopRAM, 
	        	req.body.laptopStorage, req.body.laptopPDF, req.body.laptopNameSelect];
	        queryLaptop = mysql.pool.query(queryLaptop,insert,function(error, results, fields){
	            if(error){
	                res.write(JSON.stringify(error));
	                res.end();
	            }else if(results.length == 0){
	                res.write('<h3>No match found for laptop name "'
	                    +req.body.laptopNameSelect+'", returning to home</h3>');
	                setTimeout(res.redirect('/'),2000)
	            }
	            else{
	                res.redirect('/list');
	            }
	        });
		  });
    });

    return router;
}();
