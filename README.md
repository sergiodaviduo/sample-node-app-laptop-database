# Laptop Repair Manual Index

Site by Sergio Urrutia-Oyer and lab partner, as part of Oregon State University Ecampus's CS 340 final project.

Utilizes Node.js in conjunction with MariaDB to create an editable database of laptops their specifications, and relevant PDF repair manuals if available.

Live site is at https://osu-340-laptop-database.herokuapp.com/

Data in database are editable by going to links in site header, but site refreshes to original data every half hour of inactivity. (Free version of Heroku stops Node app after 30 minutes, and once site is restarted, db initialization code is ran.)

## Building

"npm install"

configure dbcon.js with your database

run with 
"node main.js"

If you don't want the data to reset every time the app starts, comment out:

"require('./refresh_db_auto').refresh_database();
console.log("starting up, re-clearing database");"

in main.js



Uses Node 16 and default npm version that comes with Node 16
