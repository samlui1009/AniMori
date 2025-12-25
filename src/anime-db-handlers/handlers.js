import { showDeleteConfirmAlert, showDeleteSuccessAlert } from "../swal-alerts/alerts"; 

export const handleAnimeDeletion = async (animeMalId, shelfItems, setShelfItems, setAnimeDetails) => {
    try {
        const confirmDeletion = await showDeleteConfirmAlert();
        
        if (!confirmDeletion) {
            return; 
            // Placeholder code, we need to ensure that it'll show a "Deletion Not Completed" alert in the future
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

export const completeAnimeEdit = (updatedAnime, setAnimeDetails, setEditingAnime) => {
    setAnimeDetails(updatedAnime);
    setEditingAnime(null);
}

export const handleCloseEditAnimePanel = async (setEditingAnime, setAnimeDetails, setAnime) => {
    setEditingAnime(null);
    setAnimeDetails(null);
    setAnime(null);
}

export const handleAnimeAlreadyExists = async (animeMalId) => {
    console.log("Hello World");
    // Placeholder code for now
}

export const handleCloseDisplayPanel = async (setAnimeDetails, setAnime, setEditingAnime) => {
    setAnimeDetails(null);
    setAnime(null);
    setEditingAnime(null);
}

export const handleCloseSearchCard = async (setAnime) => {
    setAnime(null);
}


