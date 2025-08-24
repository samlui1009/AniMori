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
    addStatement.run({
        mal_id: anime.mal_id,
        image_url: anime.image_url,
        title: anime.title,
        episodes: anime.episodes,
        personal_status: anime.personal_status,
        personal_rating: anime.personal_rating ?? 0,
        personal_comments: anime.personal_comments ?? null,
        is_s_tier: anime.is_s_tier ?? 0
    })
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
function deleteAnimeFromDatabase(malId) {
    const deleteStatement = anidb.prepare(`
        DELETE from anime WHERE mal_id = ?`)
    deleteStatement.run(malId);
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
function returnAnimeLeanDataByStatus(personalStatus) {
    const row = anidb.prepare(`
        SELECT mal_id, title, image_url, personal_comments, personal_rating, is_s_tier FROM anime WHERE personal_status = ?`).all(personalStatus);
    // Returns result as an array
    return row;
}

export default {
    anidb,
    addNewAnime,
    deleteAnimeFromDatabase,
    updateAnimeField,
    returnAnimeCountGroupedByStatus,
    returnAnimeLeanDataByStatus,
    returnTotalAnimeCount,
    returnTotalAverageRating
};
// Required to export these so that it can be imported in preload.js

// Below are test queries to be used!
// addNewAnime({
//     mal_id: 2,
//     image_url: "https://cdn.myanimelist.net/images/anime/5/17407l.jpg",
//     title: "Naruto Shippuden",
//     episodes: 150,
//     personal_status: "Currently Watching",
//     personal_rating: "3",
//     personal_comments: "Very bleh. Not a fan of shinobis.",
//     is_s_tier: 0
// })

// addNewAnime({
//     mal_id: 3,
//     image_url: "https://www.hotmail.com",
//     title: "Pokemon", 
//     episodes: 1025,
//     personal_status: "Dropped",
//     personal_rating: 2,
//     personal_comments: "Too repetitive!",
//     is_s_tier: 0
// })

// addNewAnime({
//     mal_id: 4,
//     image_url: "https://www.google.com",
//     title: "Test Anime",
//     episodes: 5,
//     personal_status: "To Be Watched",
//     personal_rating: 5,
//     personal_comments: "5 for now, we'll see how it goes",
//     is_s_tier: 0
// })

// References: https://www.youtube.com/watch?v=IooIXYf0PIo
// References: https://www.youtube.com/watch?v=nMvjcBTFlPA&t=378s

// Learning Notes
// Prepare creates a statement object to be executed with different options 
// .all = Array 
// .get = First row only 
// .run = For mutations (INSERT, UPDATE, DELETE)
