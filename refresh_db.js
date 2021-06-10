module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Refresh database manually */
    router.post('/', function(req, res){
        var callbackCount = 0;
        require('./refresh_db_auto').refresh_database();
        callbackCount++;
        if(callbackCount >= 1){
            console.log("refreshing homepage");
            res.render('index');
        }
    });

    return router;
}();