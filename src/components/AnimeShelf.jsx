import { React, useEffect, useState } from 'react';
import EditPanel from '../components/EditPanel.jsx';

import './AnimeShelf.css';

// This component displays ALL of the animes that the user has watched so far
// TODO: Need to incorporate the AliceCarousel
function AnimeShelf ( {shelfItems = [], setShelfItems} ) {
    // Requires the {} to be "destructured"

    const [editPanel, setEditPanel] = useState(false);
    // We should NOT be seeing the edit panel from this anime shelf

    // This state will be for editing the anime of selection thereafter
    const [editingAnime, setEditingAnime] = useState(null);

    const handleEdit = async (animeMalId) => {
        const animeToEdit = shelfItems.find(anime => anime.mal_id === animeMalId);
        // Create a constant, called animeToEdit, where it will loop through array of shelf items to find the 
        // appropriate anime with the mal_id that matches the parameter we are passing into
        setEditingAnime(animeToEdit);
        console.log(animeToEdit);
        // For troubleshooting
        setEditPanel(true);
    }

    const handleDelete = async (animeMalId) => {
        try {
            await window.dbFunctions.deleteAnime(animeMalId);
            setShelfItems(prev => prev.filter(anime => anime.mal_id !== animeMalId));
        } catch {
            console.log("Anime could not be deleted");
        }
    }

    return (
        <div className="nav-btns-ctn">
            <div className="shelf-ctn">
                {shelfItems.map((anime) => (
                    <div className="anime-item" key={anime.mal_id}>
                        <img className="anime-cover"
                             src={anime.image_url}
                             alt={anime.title}>                            
                        </img>
                        <h4 className="anime-title">{anime.title}</h4>
                    </div>
                ))}

                {shelfItems.length === 0 && (
                    <div className="single-anime-display">
                        <p className="content">No content yet! Add something!</p>
                    </div>
                )}

                {editPanel && (
                    <div>
                        <EditPanel animeToEdit={editingAnime}
                        onClose={() => setEditPanel(false)}></EditPanel>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AnimeShelf