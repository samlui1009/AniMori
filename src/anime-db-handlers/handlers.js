export const handleAnimeDeletion = async (animeMalId, shelfItems, setShelfItems, setAnimeDetails) => {
    try {
        await window.dbFunctions.deleteAnime(animeMalId);
        const updatedShelfItems = shelfItems.filter(anime => anime.mal_id !== animeMalId);
        setShelfItems(updatedShelfItems);
        setAnimeDetails(null);    
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

export const handleCloseDisplayPanel = async (setAnimeDetails, setAnime, setEditingAnime) => {
    setAnimeDetails(null);
    setAnime(null);
    setEditingAnime(null);
}

export const handleCloseSearchCard = async (setAnime) => {
    setAnime(null);
}


