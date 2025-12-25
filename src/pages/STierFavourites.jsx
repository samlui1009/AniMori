import { useState, useEffect } from 'react';

import { handleAnimeDeletion, viewAnimeDetails, handleEditAnime, handleCloseDisplayPanel } from '../anime-db-handlers/handlers.js';

import STiers from '../components/STierShelf.jsx';
import OneShowPanel from '../components/DisplayOneShowPanel.jsx'
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';
import EditPanel from '../components/EditPanel.jsx'

import './Pages.css'

// ASSUME: S-Tiers should have been Watched/Completed already - CANNOT add/make modifications to this, it's a "display/achievement shelf" only
function STierFavourites() {

    // Search card state
    const [anime, setAnime] = useState(null);

    const [animeDetails, setAnimeDetails] = useState(null);
    const [shelfItems, setShelfItems] = useState([]);
    const [editingAnime, setEditingAnime] = useState(null);

    useEffect(() => {
        const run = async () => {
            const sTierAnimeData = await window.dbFunctions.getAnimeLeanDataBySTier();
            setShelfItems(sTierAnimeData);
            console.log(sTierAnimeData);
        };
        run();
    }, []);

    return(
        <div className="ctn">
            <div className="nav-ctn">
                <NavSB className="nav-sb" onAnimeResult={setAnime}></NavSB>
            </div>
            <div className="dl-ctn">
                <DLMode></DLMode>
            </div>
            <div className="header-ctn">
                <h3 className="title">S-Tier Favourites 💕 ( ദ്ദി ˙ᗜ˙ ) </h3>
            </div>

            {!editingAnime && !anime && !animeDetails && (
                <STiers
                    shelfItems={shelfItems} 
                    setShelfItems={setShelfItems}
                    onClick = {(animeMalId) => viewAnimeDetails(animeMalId, shelfItems, setAnimeDetails)}>                            
                </STiers>)
            }

            {!editingAnime && animeDetails && (
                <OneShowPanel
                    shelfItems={shelfItems}
                    animeMalId={animeDetails.mal_id}
                    onEdit={() => handleEditAnime(animeDetails.mal_id, shelfItems, setEditingAnime)}
                    onDelete={() => handleAnimeDeletion(animeDetails.mal_id, shelfItems, setShelfItems, setAnimeDetails)}
                    onCancel={() => handleCloseDisplayPanel(setAnimeDetails, setAnime, setEditingAnime)}>
                </OneShowPanel>
            )}

            {editingAnime && (
                <EditPanel
                    animeToEdit={editingAnime}
                    setEditingAnime={setEditingAnime}
                    setAnimeDetails={setAnimeDetails}
                    shelfItems={shelfItems}
                    setShelfItems={setShelfItems}
                    status={"Watched"}>
                </EditPanel>
            )}
        </div>
    )
}

export default STierFavourites