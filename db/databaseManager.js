import Database from 'better-sqlite3';

const anidb = new Database("./animori.db", { verbose: console.log });
// Following documentation

anidb.exec(`
    CREATE TABLE IF NOT EXISTS anime (
      mal_id INTEGER PRIMARY KEY,
      image_url TEXT,
      title TEXT,
      episodes INTEGER,
      airing BOOLEAN,
      genres TEXT,
      season TEXT,
      year INTEGER,
      status TEXT,
      personal_status TEXT,
      personal_rating INTEGER,
      personal_comments TEXT,
      is_s_tier INTEGER
    )
`);
// This is basic SQL syntax - Need to revise
// The database executes this in case the table doesn't exist
// All of the query logic will be handled here

// REQUIRES: The anime must exist within the database
// MODIFIES: Anime
// EFFECTS:  Inserts a new anime into the animori database
// This is for INSERTING a new anime with all of these values into the SQLite database
function addNewAnime(anime) {
    const addStatement = anidb.prepare(`
        INSERT INTO anime (mal_id, image_url, title, episodes, airing, genres, season, year, status, personal_status, personal_rating, personal_comments, is_s_tier)
        VALUES (@mal_id, @image_url, @title, @episodes, @airing, @genres, @season, @year, @status, @personal_status, @personal_rating, @personal_comments, @is_s_tier)
        `)
    addStatement.run(anime);
}

// Below: Update queries

// REQUIRES: The anime must exist within the database 
// MODIFIES: Anime
// EFFECTS:  Modifies the selected animes' personal comments
function updateAnimeComments(newComments, malId) {
    const updateStatement = anidb.prepare(`
        UPDATE anime SET personal_comments = ? WHERE mal_id = ?`);
    updateStatement.run(newComments, malId);
}

// REQUIRES: The anime must exist within the database 
// MODIFIES: Anime
// EFFECTS:  Modifies the selected animes' personal rating
function updateAnimeRating(newRating, malId) {
    const updateStatement = anidb.prepare(`
        UPDATE anime SET personal_RATING = ? WHERE mal_id = ?`)
    updateStatement.run(newRating, malId);
}

// REQUIRES: The anime must exist within the database 
// MODIFIES: Anime
// EFFECTS:  Modifies the selected animes' personal status
function updateAnimePersonalStatus(newStatus, malId) {
    const updateStatement = anidb.prepare(`
        UPDATE anime SET personal_status = ? WHERE mal_id = ?`)
    updateStatement.run(newStatus, malId);
}

// REQUIRES: Anime must exist within database
// MODIFIES: Anime 
// EFFECTS: Modifies the S-Tier "boolean" flag for the anime 
function updateAnimeSTierFlag(updatedFlag, malId) {
    const updateStatement = anidb.prepare(`
        UPDATE anime SET is_s_tier = ? WHERE mal_id = ?`)
    updateStatement.run(updatedFlag, malId);
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
// MODIFIES: None
// EFFECTS:  Returns all listed anime titles as an array
function returnAllAnimeTitles() {
    const returnStatement = anidb.prepare("SELECT title FROM anime");
    return returnStatement.all();
}
// Do I need this?

// REQUIRES: The anime must exist within the database
// MODIFIES: None 
// EFFECTS: Returns the total number of anime that falls under "Watched"
function returnAnimeCountGroupedByWatched() {
    const returnStatement = anidb.prepare(`
        SELECT COUNT(*) FROM anime WHERE personal_status = 'Watched`)
    return returnStatement.all();
}

// REQUIRES: The anime must exist within the database
// MODIFIES: None 
// EFFECTS: Returns the total number of anime that falls under "To Be Watched"
function returnAnimeCountGroupedByToBeWatched() {
    const returnStatement = anidb.prepare(`
        SELECT COUNT(*) FROM anime WHERE personal_status = 'To Be Watched'`)
    return returnStatement.all();
}

// REQUIRES: The anime must exist within the database
// MODIFIES: None 
// EFFECTS: Returns the total number of anime that falls under "Watched"
function returnAnimeCountGroupedByWatching() {
    const returnStatement = anidb.prepare(`
        SELECT COUNT(*) FROM anime WHERE personal_status = 'Watching'`)
    return returnStatement.all();
}

// REQUIRES: Anime must exist within database
// MODIFIES: None
// EFFECTS: Returns the total number of anime that are flagged as S-Tier
function returnAnimeCountAllSTiers() {
    const returnStatement = anidb.prepare(`
        SELECT COUNT(*) FROM anime WHERE is_s_tier = 1`)
    return returnStatement.all();
}

// REQUIRES: The anime must exist within the database
// MODIFIES: None 
// EFFECTS: Returns the total number of anime that falls under "Dropped"
function returnAnimeCountGroupedByDropped() {
    const returnStatement = anidb.prepare(`
        SELECT COUNT(*) FROM anime WHERE personal_status = 'Dropped'`)
    return returnStatement.all();
}

// REQUIRES: The anime must exist within the database
// MODIFIES: None 
// EFFECTS: Returns the total averaged rating of anime
function returnTotalAverageRating() {
    const returnStatement = anidb.prepare(`
        SELECT AVG(personal_RATING) FROM anime`)
    return returnStatement.all();
}

// REQUIRES: The anime must exist within the database
// MODIFIES: None 
// EFFECTS: Returns the total averaged rating of anime
function returnTotalAnimeCount() {
    const returnStatement = anidb.prepare(`
        SELECT COUNT(*) FROM anime`)
    return returnStatement.all();
}

console.log(returnTotalAnimeCount());

export default {
    anidb,
    addNewAnime,
    updateAnimeComments,
    updateAnimePersonalStatus,
    updateAnimeRating,
    updateAnimeSTierFlag,
    deleteAnimeFromDatabase,
    returnAllAnimeTitles,
    returnAnimeCountGroupedByDropped,
    returnAnimeCountAllSTiers,
    returnAnimeCountGroupedByToBeWatched,
    returnAnimeCountGroupedByWatched,
    returnAnimeCountGroupedByWatching,
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
// Test-trial, dummy anime

// const testSelect = anidb.prepare(`
//     SELECT * FROM anime`)
// console.log(testSelect.all());
// Test query - Mainly used to select ALL anime that is recorded

// References: https://www.youtube.com/watch?v=IooIXYf0PIo
// References: https://www.youtube.com/watch?v=nMvjcBTFlPA&t=378s

// Learning Notes
// Prepare creates a statement object to be executed with different options 
// .all = Array 
// .get = First row only 
// .run = For mutations (INSERT, UPDATE, DELETE)
