const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "/../", "library-db.sqlite3")

//const dbFile = "library.sqlite3";
db = new sqlite3.Database(dbPath);

module.exports = db
