module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Refresh database 15 minutes after the last edit. */
    router.post('/', function(req, res){
        require('./refresh_db_auto').refresh_database();
    });

    return router;
}();