const API_URL = 'https://api.jikan.moe/v4';
// Base URL for the API call

export const searchAnimeByTitle = async (title) => {
    const response = await fetch(`${API_URL}/anime?q=${encodeURIComponent(title)}&limit=1`);
    if (!response.ok) {
        throw new Error("Failed to return the searched anime");
    }
    const data = await response.json();
    return data.data[0];
    // This also ensures that we return the FIRST element, since Jikan returns an array and not just 
    // the first search
}

// https://medium.com/@tarimbilal4/build-a-stunning-anime-dashboard-with-reactjs-using-jikan-api-tailwindcss-firebase-and-chart-js-a2750437f903
// This is a centralized area to keep all API endpoints in place
// https://dev.to/hr21don/build-your-own-anime-search-app-using-jikan-api-4n79
// Read comment below - Since Jikan will give multiple results, we need to take out the FIRST one
