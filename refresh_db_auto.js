function refresh_database(){
    var express = require('express');
    var mysql = require('./dbcon.js');

    function createRefreshQuery(){
        var query = "DROP TABLE IF EXISTS `laptopCPUs`;";
        query += "DROP TABLE IF EXISTS `laptopGraphics`;";
        query += "DROP TABLE IF EXISTS `laptops`;";
        query += "DROP TABLE IF EXISTS `graphics`;";
        query += "DROP TABLE IF EXISTS `CPUs`;";
        query += "DROP TABLE IF EXISTS `manufacturers`;"
        query += "CREATE TABLE manufacturers (" +
            "manufacturerID INT(11) AUTO_INCREMENT, " +
            "manufacturerName VARCHAR(255), " +
            "PRIMARY KEY (manufacturerID)" +
            ");";
        query += "INSERT INTO manufacturers VALUES (1, 'Dell'), (2,'Nvidia'), (3,'HP'), (4,'Intel'), (5,'AMD');\n";
        query += "CREATE TABLE graphics (\n" +
            "graphicsID INT(11) AUTO_INCREMENT, " +
            "graphicsName VARCHAR(255) NOT NULL, " +
            "dedicatedMem VARCHAR(255) NOT NULL, " +
            "manufacturerID INT(11), " +
            "PRIMARY KEY (graphicsID)" +
            ");";
        query += "ALTER TABLE graphics\n" +
            "ADD FOREIGN KEY (manufacturerID) REFERENCES manufacturers (manufacturerID);";
        query += "INSERT INTO graphics VALUES (1, 'GeForce GTX 2070', '8GB', 2), (2,'GeForce GTX 3080', " +
            "'16GB', 2), (3,'GeForce RTX 3060', '6GB', 2), (4, 'GeForce GT 630M', '2GB GDDR5', 2);";
        query += "CREATE TABLE CPUs (" +
            "cpuID INT(11) AUTO_INCREMENT," +
            "    cpuName VARCHAR(255) NOT NULL," +
            "    clockSpeed VARCHAR(255) NOT NULL," +
            "    manufacturerID INT(11)," +
            "    PRIMARY KEY (cpuID)" +
            ");";
        query += `ALTER TABLE CPUs
                    ADD FOREIGN KEY (manufacturerID) REFERENCES manufacturers (manufacturerID);`;
        query += `INSERT INTO CPUs VALUES (1, 'i5', '3200', 4),
                    (2,'i9', '3600', 4), (3,'Ryzen 7 5600X', '3400', 5), (4,'Ryzen 5', '3600', 5), (5,'i3','3000', 4), 
                    (6,'i7','3400', 4);`;
        query += `CREATE TABLE laptops (
                    laptopID INT(11) AUTO_INCREMENT,
                        laptopName VARCHAR(255) NOT NULL,
                        ram VARCHAR(255) NOT NULL,
                        storageAmount VARCHAR(255) NOT NULL,
                        pdfLink VARCHAR(255) NOT NULL,
                        manufacturerID INT(11),
                        PRIMARY KEY (laptopID)
                    );`;
        query += `ALTER TABLE laptops
                    ADD FOREIGN KEY (manufacturerID) REFERENCES manufacturers (manufacturerID);`;
        query += `INSERT INTO laptops VALUES (1, 'ProBook', '16GB', '500GB', 'google.com', 3), 
                    (2, 'XPS14-9092sLV', '16GB', '1TB', 'google.com', 1), 
					(3, 'XPS 13', '8 or 16 GB', '256 or 512 GB', 'https://dl.dell.com/topicspdf/xps-13-9350-laptop_service-manual_en-us.pdf', 1),
					(4, 'XPS 13 7390 2-in-1', '8 GB LPDDR4x', '256 GB', 'https://dl.dell.com/topicspdf/xps-13-7390-2-in-1-laptop_service-manual_en-us.pdf', 1),
					(5, 'OMEN Laptop 15z-en100', '8 GB', '512 GB', 'http://h10032.www1.hp.com/ctg/Manual/c06638088.pdf', 3);`;
        query += `CREATE TABLE laptopCPUs (
            pairID INT(11) AUTO_INCREMENT,
                laptopID INT(11),
                cpuID INT(11),
                PRIMARY KEY (pairID)
            );`;
        query += `ALTER TABLE laptopCPUs
                ADD FOREIGN KEY (laptopID) REFERENCES laptops (laptopID);`;
        query += `ALTER TABLE laptopCPUs
                ADD FOREIGN KEY (cpuID) REFERENCES CPUs (cpuID);`;
        query += `INSERT INTO laptopCPUs VALUES (1, 1, 2), (2,3,1),(3,3,6),(4,3,5),(5,2,1);`;
        query += `CREATE TABLE laptopGraphics (
                pairID INT(11) AUTO_INCREMENT,
                    laptopID INT(11),
                    graphicsID INT(11),
                    PRIMARY KEY (pairID)
            );`;
        query += `ALTER TABLE laptopGraphics
                ADD FOREIGN KEY (laptopID) REFERENCES laptops (laptopID);`;
        query += `ALTER TABLE laptopGraphics
                ADD FOREIGN KEY (graphicsID) REFERENCES graphics (graphicsID);`;
        query += `INSERT INTO laptopGraphics VALUES (1, 1, 1), (2,2,4);`;

        return query;
    }

    // sends post request to clear and re-init database
    // for auto refresh
    var query_index = new Array(24);
    var count = 24;
    var index = 0;

    while (count != 0) {
        query_index[index] = count;
        count--;
        index++;
    }

    var query = createRefreshQuery();
    mysql.pool.query(query, query_index, function(error, results, fields){
        if(error) {
            console.log("*** database re-instantiation failed ***");
            console.log(results);
            console.log(fields);
        }
        else {
            console.log("** database successfully refreshed **");
        }
    });
};

module.exports = {
    refresh_database: refresh_database
}