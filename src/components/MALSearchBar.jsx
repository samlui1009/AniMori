import { useState } from 'react';
import { searchAnimeByTitle } from '../JikanRequests.js';
// Imported the API call through JikanRequests HERE
import './MALSearchBar.css';

function MALSearchBar( {animeResult} ) {
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
            animeResult(result);
            // Use THIS to pass it to the parent
        } catch (err) {
            setError("Error! Anime could not be found");
        }
    };

    return (
        <div className="search-bar-ctn">
            <form onSubmit={handleSearch}>
                <input className="input-field" 
                       placeholder="Type Anime Name Here" 
                       value={query} 
                       onChange={(e) => setQuery(e.target.value)}></input>
                <div className="search-btn-ctn">
                    <button className="search-btn" type="submit">Search!</button>
                </div>
            </form>
        </div>
    )
}

export default MALSearchBar