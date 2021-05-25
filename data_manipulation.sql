
-- DELETE

-- Delete from laptops by laptopName
DELETE FROM laptops WHERE laptopName = :laptopNameInput
-- show available laptops (for dropdown)
SELECT laptopName FROM laptops

-- ADD

-- Add laptop
INSERT INTO laptop (laptopName, manufacturerID, ram, storage, pdfLINK)
VALUES (:laptopName, :laptopManu, :laptopRAM, :laptopStorage, :laptopPDF);

-- Add manufacturer
INSERT INTO manufacturer (manufacturerName)
VALUES (:manufacturerName);

-- Add CPU
INSERT INTO CPUs (manufacturerName)
VALUES (:manufacturerName);

-- Add GPU
INSERT INTO graphics (cpuName, clockSpeed, manufacturerID)
VALUES (:cpuName, :clockSpeed, :manufacturerID);

-- Insert values into laptops graphics table
-- display laptops and graphics so user can see available laptops and graphics
SELECT laptopName, laptopID FROM laptops
SELECT graphicsName, graphicsID FROM graphics
-- insert data
INSERT INTO laptopGraphics (laptopID, graphicsID) VALUES (:laptopIDInput, :graphicsIDInput)

-- Insert values into laptops cpus table
-- display laptops and cpus so user can see available laptops and cpus
SELECT laptopName, laptopID FROM laptops
SELECT cpuName, graphicsID FROM CPUs
INSERT INTO laptopCPUs (laptopID, cpuID) VALUES (:laptopIDInput, :cpuIDInput)

--UPDATE

-- Update laptops
-- show available laptops (for dropdown)
SELECT laptopName FROM laptops
-- update code
UPDATE `laptops`
SET `laptopName`=`:laptopName`, `manufacturerID`=`:laptopManu`, `ram`=`:laptopRAM`, `storage`=`:laptopStorage`, `pdfLINK`=`:laptopPDF`
WHERE `laptopName`=`:Laptop`


-- SEARCH

-- Find Laptops by CPU
-- get CPU id
SELECT cpuID FROM CPUs WHERE cpuName = `:cpuName`
-- app gets id and assigns it to cpuID backend var, pushes back to statement
SELECT laptopID FROM LaptopCPUs WHERE cpuID = `:cpuID`
-- show laptops with selected id
SELECT * FROM laptops WHERE laptopID = `:laptopID`


-- Find Laptops by GPU
SELECT gpuID FROM graphics WHERE graphicsName = `:gpuName`
-- app gets id and assigns it to gpuID backend var, pushes back to statement
SELECT laptopID FROM LaptopGraphics WHERE graphicsID = `:gpuID`
-- show laptops with selected id
SELECT * FROM laptops WHERE laptopID = `:laptopID`

-- LIST

-- List all laptops
SELECT * FROM laptops

-- List all cpus
SELECT * FROM CPUs

-- List all graphics
SELECT * FROM graphics

-- List all manufacturers
SELECT * FROM manufacturers

-- List all laptop graphics pairs
SELECT * FROM laptopGraphics

-- List all laptop cpu pairs
SELECT * FROM laptopCPUs
