const Database = require("better-sqlite3")
// Imports Better-SqLite3 library => Synchronous interface for interacting 
// with SQLite databases in Node.js => Constructor, just like in 210
const path = require("path")
// Imports Node.js built-in "path" module => Required for working with file and 
// directory paths

const dbPath =
    process.env.NODE_ENV === "development"
        ? "./animori.db"
        : path.join(_dirname, "..", "animori.db")
        // This defines the path to the SQLite database file, called "animori.db"
        // As per named in mine
        // If Node Environment is set to "Development", then the db file is 
        // located in the current directory
        // Otherwise, it'll use path.join to indicate the path to the app's resources 
        // directory

const db = new Database(dbPath)
db.pragma("journal_mode = WAL")
// Write-Ahead Logging
// SQLite PRAGMA (?)

exports.db = db
// Exports db, making it available for other modules to import and use