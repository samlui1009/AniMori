const API_URL = 'https://api.jikan.moe/v4';
// Base URL for the API call

// This allows us to search MAL for an anime by its title, and is programmed to return the FIRST RESULT only
export const searchAnimeByTitle = async (title) => {
    const response = await fetch(`${API_URL}/anime?q=${encodeURIComponent(title)}&limit=1`);
    if (!response.ok) {
        throw new Error("Failed to return the searched anime");
    }
    const data = await response.json();
    return data.data[0];
}
