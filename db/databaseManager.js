import Database from 'better-sqlite3';

const anidb = new Database("./animori.db", { verbose: console.log });
// Following documentation

anidb.exec(`
    CREATE TABLE IF NOT EXISTS anime (
      mal_id INTEGER PRIMARY KEY,
      image_url TEXT,
      title TEXT,
      episodes INTEGER,
      personal_status TEXT,
      personal_rating INTEGER,
      personal_comments TEXT,
      is_s_tier INTEGER
    )
`);
// This is basic SQL syntax
// The database executes this in case the table doesn't exist
// All of the query logic will be handled here

// Aug 23: Revised the schema for the anime table so it's more lean and fitting of
// requires for displaying anime data in the Shelf component

// REQUIRES: The anime must exist within the database
// MODIFIES: Anime
// EFFECTS:  Inserts a new anime into the animori database
// This is for INSERTING a new anime with all of these values into the SQLite database
function addNewAnime(anime) {
    const addStatement = anidb.prepare(`
        INSERT INTO anime (mal_id, image_url, title, episodes, personal_status, personal_rating, personal_comments, is_s_tier)
        VALUES (@mal_id, @image_url, @title, @episodes, @personal_status, @personal_rating, @personal_comments, @is_s_tier)
        `)
    addStatement.run(anime);
}

// Below: Update queries
// REQUIRES: Anime must be present within database
// MODIFIES: AnimeDb
// EFFECTS: Updates the database field accordingly with the value
function updateAnimeField(field, value, malId) {
    const allowedFields = ["personal_rating", "personal_status", "is_s_tier", "personal_comments"];
    if (!allowedFields.includes(field)) {
        throw new Error(`Invalid field: ${field}`);
    }

    const runStatement = anidb.prepare(`
        UPDATE anime SET ${field} = ? WHERE mal_id = ?`)
    runStatement.run(value, malId);
}

// Below: Delete queries - Really only just this one needed though
// Functional and working!
function deleteAnimeFromDatabase(foundId, malId) {
    const deleteStatement = anidb.prepare(`
        DELETE from anime WHERE mal_id = ?`)
    deleteStatement.run(foundId, malId);
}

// Below: Return queries
// REQUIRES: The anime must exist within the database
// MODIFIES: N/A - Refactored from independent queries
// EFFECTS: Returns the total averaged rating of anime
function returnAnimeCountGroupedByStatus(personalStatus) {
    const row = anidb.prepare(`
        SELECT COUNT(*) AS count FROM anime WHERE personal_status = ?`).get(personalStatus);
    return row ? row.count : 0;
    // Returns back either the count value OR 0
}

// REQUIRES: The anime must exist within the database
// MODIFIES: None 
// EFFECTS: Returns the total averaged rating of anime
function returnTotalAverageRating() {
    const row = anidb.prepare(`
        SELECT AVG(personal_RATING) AS average FROM anime`).get();
    return row ? row.average : 0;
}

// REQUIRES: The anime must exist within the database
// MODIFIES: None 
// EFFECTS: Returns the total averaged rating of anime
function returnTotalAnimeCount() {
    const row = anidb.prepare(`
        SELECT COUNT(*) AS count FROM anime`).get();
    return row.count;
}

// REQUIRES: The anime must exist within the database
// MODIFIES: None 
// EFFECTS: Returns "lean" anime data to be displayed in Shelf component 
function returnAnimeLeanDataFromMalID(malId) {
    const row = anidb.prepare(`
        SELECT * FROM anime`).get(malId);
    return row.all();
    // Returns result as an array
}

export default {
    anidb,
    addNewAnime,
    deleteAnimeFromDatabase,
    updateAnimeField,
    returnAnimeCountGroupedByStatus,
    returnAnimeLeanDataFromMalID,
    returnTotalAnimeCount,
    returnTotalAverageRating
};
// Required to export these so that it can be imported in preload.js

// addNewAnime({
//     mal_id: 1,
//     image_url: "https://static.wikia.nocookie.net/p__/images/c/cf/Takopi_anime1.png/revision/latest?cb=20250630020546&path-prefix=protagonist",
//     title: "Takopi's Original Sin",
//     episodes: 6,
//     airing: 0,
//     genres: "Horror, Time-Travel",
//     season: "summer",
//     year: 2025,
//     status: "Finished Airing",
//     personal_status: "S-Tiers",
//     personal_rating: 5,
//     personal_comments: "Best anime, 10/10 - will watch again. Made me sob buckets!"
// })
// Test-trial, dummy anime entry

// References: https://www.youtube.com/watch?v=IooIXYf0PIo
// References: https://www.youtube.com/watch?v=nMvjcBTFlPA&t=378s

// Learning Notes
// Prepare creates a statement object to be executed with different options 
// .all = Array 
// .get = First row only 
// .run = For mutations (INSERT, UPDATE, DELETE)
