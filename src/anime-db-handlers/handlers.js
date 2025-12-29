import { showDeleteConfirmAlert, showDeleteSuccessAlert } from "../swal-alerts/alerts"; 

export const handleAnimeDeletion = async (animeMalId, shelfItems, setShelfItems, setAnimeDetails) => {
    try {
        const confirmDeletion = await showDeleteConfirmAlert();
        
        if (!confirmDeletion) {
            return; 
        } else {
            await window.dbFunctions.deleteAnime(animeMalId);
            const updatedShelfItems = shelfItems.filter(anime => anime.mal_id !== animeMalId);
            await window.dbFunctions.deleteAllNullEntries();
            setShelfItems(updatedShelfItems);
            setAnimeDetails(null); 
            showDeleteSuccessAlert();       
        }
    } catch {
        console.log("Selected anime could not be deleted!");
    }
}

export const viewAnimeDetails = async (animeMalId, shelfItems, setAnimeDetails) => {
    const animeDetails = shelfItems.find(anime => anime.mal_id === animeMalId);
    setAnimeDetails(animeDetails);
}

export const handleEditAnime = async (animeMalId, shelfItems, setEditingAnime) => {
    const animeToEdit = shelfItems.find(anime => anime.mal_id === animeMalId);
    setEditingAnime(animeToEdit);
}

export const handleCloseEditAnimePanel = async (setEditingAnime, setAnimeDetails, setAnime) => {
    setEditingAnime(null);
    setAnimeDetails(null);
    setAnime(null);
}

export const searchForAnimeInCollection = async (setSearchResults, searchTerm, status) => {
    // For troubleshooting
    console.log("Current search term: ", searchTerm);
    const filteredAnimeData = await window.dbFunctions.getAnimeByNameAndWatchStatus(searchTerm, status);
    // For troubleshooting
    console.log("Filtered Anime Data:", filteredAnimeData);
    setSearchResults(filteredAnimeData);
};


export const handleCloseDisplayPanel = async (setAnimeDetails, setAnime, setEditingAnime) => {
    setAnimeDetails(null);
    setAnime(null);
    setEditingAnime(null);
}

export const handleCloseSearchCard = async (setAnime) => {
    setAnime(null);
}


