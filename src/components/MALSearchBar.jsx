import { useState } from 'react';
import { searchAnimeByTitle } from '../JikanRequests.js';
// Imported the API call through JikanRequests HERE
import './MALSearchBar.css';

// TODO

function MALSearchBar() {
    const [query, setQuery] = useState("");
    // Query - Initial state: What are we typing?
    // We should not be typing ANYTHING
    const [anime, setAnime] = useState(null);
    // No anime just yet - yes, should be NULL
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const result = await searchAnimeByTitle(query);
            setAnime(result);
        } catch (err) {
            setError("Error! Anime could not be found");
        }
    };

    return (
        <div className="search-bar-ctn">
            <form onSubmit={handleSearch} method="get">
                <input type="search" name="query" placeholder="Find your anime here" value={query} onChange={(e) => setQuery(e.target.value)}></input>
                <button type="submit"></button>
            </form>

            {anime && (
                <div className="anime-result">
                    <h2>{anime.title}</h2>
                    <img src={anime.images.jpg.image_url} alt={anime.title} />
                </div>
            )}
        </div>
    )
}

export default MALSearchBar