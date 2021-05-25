--
-- Delete Tables in order
--

DROP TABLE IF EXISTS `laptopCPUs`;
DROP TABLE IF EXISTS `laptopGraphics`;
DROP TABLE IF EXISTS `laptops`;
DROP TABLE IF EXISTS `graphics`;
DROP TABLE IF EXISTS `CPUs`;
DROP TABLE IF EXISTS `manufacturers`;

--
-- Create Manufacturers table
--

CREATE TABLE manufacturers (
	manufacturerID INT(11) AUTO_INCREMENT,
	manufacturerName VARCHAR(255),
    PRIMARY KEY (manufacturerID)
);

--
-- Dump data into Manufacturers
--

INSERT INTO manufacturers VALUES (1, 'Dell'), (2,'Nvidia'), (3,'HP'), (4,'Intel');

--
-- Create Graphics table
--

CREATE TABLE graphics (
	graphicsID INT(11) AUTO_INCREMENT,
    graphicsName VARCHAR(255) NOT NULL,
    dedicatedMem VARCHAR(255) NOT NULL,
    manufacturerID INT(11),
    PRIMARY KEY (graphicsID)
);
ALTER TABLE graphics
	ADD FOREIGN KEY (manufacturerID) REFERENCES manufacturers (manufacturerID);
    
--
-- Dump data into graphics
--

INSERT INTO graphics VALUES (1, 'GTX 2070', '8GB', 2), (2,'GTX 3080', '16GB', 2), (3,'Ryzen 5 3600', '10GB', 2);

--
-- Create CPUs table
--

CREATE TABLE CPUs (
	cpuID INT(11) AUTO_INCREMENT,
    cpuName VARCHAR(255) NOT NULL,
    clockSpeed VARCHAR(255) NOT NULL,
    manufacturerID INT(11),
    PRIMARY KEY (cpuID)
);
ALTER TABLE CPUs
	ADD FOREIGN KEY (manufacturerID) REFERENCES manufacturers (manufacturerID);

--
-- Dump data into CPUs
--

INSERT INTO CPUs VALUES (1, 'i5', '3200', 4), (2,'i9', '3600', 4), (3,'Ryzen 7 5600X', '3400', 4);

--
-- Create Laptops table
--

CREATE TABLE laptops (
	laptopID INT(11) AUTO_INCREMENT,
    laptopName VARCHAR(255) NOT NULL,
    ram VARCHAR(255) NOT NULL,
    storageAmount VARCHAR(255) NOT NULL,
    pdfLink VARCHAR(255) NOT NULL,    
    manufacturerID INT(11),
    PRIMARY KEY (laptopID)
);
ALTER TABLE laptops
	ADD FOREIGN KEY (manufacturerID) REFERENCES manufacturers (manufacturerID);

--
-- Dump data into laptops
--

INSERT INTO laptops VALUES (1, 'ProBook', '16GB', '500GB', 'google.com', 3), (2, 'XPS', '16GB', '1TB', 'google.com', 1);

--
-- Create LaptopCPUs table
--

CREATE TABLE laptopCPUs (
	pairID INT(11) AUTO_INCREMENT,
    laptopID INT(11),
    cpuID INT(11),
    PRIMARY KEY (pairID)
);
ALTER TABLE laptopCPUs
	ADD FOREIGN KEY (laptopID) REFERENCES laptops (laptopID);

ALTER TABLE laptopCPUs
	ADD FOREIGN KEY (cpuID) REFERENCES CPUs (cpuID);

--
-- Dump data into laptopCPUs
--

INSERT INTO laptopCPUs VALUES (1, 1, 2), (2, 2, 1), (3, 2, 3);

--
-- Create LaptopGraphics table
--

CREATE TABLE laptopGraphics (
	pairID INT(11) AUTO_INCREMENT,
    laptopID INT(11),
    graphicsID INT(11),
    PRIMARY KEY (pairID)
);

ALTER TABLE laptopGraphics
	ADD FOREIGN KEY (laptopID) REFERENCES laptops (laptopID);

ALTER TABLE laptopGraphics
	ADD FOREIGN KEY (graphicsID) REFERENCES graphics (graphicsID);

--
-- Dump data into laptopCPUs
--

INSERT INTO laptopGraphics VALUES (1, 1, 1), (2, 2, 2), (3, 2, 3);


