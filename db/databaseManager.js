import Database from 'better-sqlite3';

const anidb = new Database("./animori.db", { verbose: console.log });
// Following documentation

// Query logic is defined below, starting with table creation if it doesn't exist
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

// REQUIRES: The anime must NOT exist within the database
// MODIFIES: Anime
// EFFECTS:  Inserts a new anime into the animori database
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

// REQUIRES: Anime must be present within database
// MODIFIES: AnimeDb
// EFFECTS:  Returns the anime's data accordingly
function returnAnimeByMalId(malId) {
    const row = anidb.prepare(`
        SELECT * FROM anime WHERE mal_id = ?`).get(malId);
    return row;
}

// Below: Delete queries - Really only just this one needed though
// Functional and working!
function deleteAnimeFromDatabase(malId) {
    const deleteStatement = anidb.prepare(`
        DELETE from anime WHERE mal_id = ?`)
    deleteStatement.run(malId);
}

// REQUIRES: malId must be a valid number
// MODIFIES: None
// EFFECTS: Returns true if an anime with the given malId exists in the database, false otherwise
function doesAnimeExist(malId) {
    const query = anidb.prepare(`
        SELECT EXISTS(SELECT 1 FROM anime WHERE mal_id = ?)
    `);
    // First, execute the query
    const result = query.get(malId);
    // Then, convert the result we received into a Boolean value
    return Boolean(Object.values(result)[0]);
}

// REQUIRES: The anime must exist within the database
// MODIFIES: N/A
// EFFECTS: Returns multiple rows of data based on the users' inputted name/title when searching
function returnAnimeByNameAndWatchStatus(animeName, watchStatus) {
    const rows = anidb.prepare(`
        SELECT * FROM anime WHERE title LIKE ? COLLATE NOCASE AND personal_status = ?`).all(`${animeName}%`, watchStatus);
    return rows || null;
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

// REQUIRES: The anime must exist within the database
// MODIFIES: None
// EFFECTS: Returns "lean" anime data to be displayed in STier Shelf component, only those flagged as S-Tiers 
function returnAnimeLeanDataBySTier() {
    const row = anidb.prepare(`
        SELECT mal_id, title, image_url, personal_comments, personal_rating, is_s_tier FROM anime WHERE is_s_tier = 1`).all();
        // Return back as an array
    return row;
}

// REQUIRES: N/A
// MODIFIES: animeDb
// EFFECTS: Clears out any null entries that are found within the database - Primarily for maintenance to clear out anything after deletions
function deleteAllNullEntries() {
    const deleteStatement = anidb.prepare(`
        DELETE FROM anime WHERE mal_id IS NULL`)
    deleteStatement.run();
}

export default {
    anidb,
    addNewAnime,
    doesAnimeExist,
    deleteAnimeFromDatabase,
    deleteAllNullEntries,
    updateAnimeField,
    returnAnimeCountGroupedByStatus,
    returnAnimeLeanDataByStatus,
    returnTotalAnimeCount,
    returnTotalAverageRating,
    returnAnimeLeanDataBySTier,
    returnAnimeByMalId,
    returnAnimeByNameAndWatchStatus
};
// Required to export these so that it can be imported into preload.js
