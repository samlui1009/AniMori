import { useState, useEffect } from 'react';

import { handleAnimeDeletion, viewAnimeDetails, handleEditAnime, handleCloseDisplayPanel, handleCloseSearchCard } from '../anime-db-handlers/handlers.js';

import AnimeShelf from '../components/AnimeShelf.jsx';
import OneShowPanel from '../components/DisplayOneShowPanel.jsx';
import MALSearchBar from '../components/MALSearchBar.jsx';
import EditPanel from '../components/EditPanel.jsx';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';
import AnimeSearchCard from '../components/AnimeSearchCard.jsx';
import './Pages.css'

function Dropped() {

    const status = "Dropped";
    const [animeDetails, setAnimeDetails] = useState(null);
    const [shelfItems, setShelfItems] = useState([]);
    const [editingAnime, setEditingAnime] = useState(null);

    // Search card state
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        const run = async () => {
            const allAnimeData = await window.dbFunctions.getAnimeLeanDataByStatus(status);
            setShelfItems(allAnimeData);
            console.log(allAnimeData)
        };
        run();
    }, [status]);

    return(
        <div className="ctn">
            <div className="nav-ctn">
                <NavSB className="nav-sb" onAnimeResult={setAnime}></NavSB>
            </div>
            <div className="dl-ctn">
                <DLMode></DLMode>
            </div>
            <div className="header-ctn">
                <h3 className="title">🗑️ Dropped 🗑️</h3>
                <p className="tagline">( ˵ •̀ □ •́ ˵ ): Enough said!</p>
            </div>

            <div>
                <MALSearchBar variant="header" animeResult={setAnime}></MALSearchBar>
            </div>

            {!editingAnime && !anime && !animeDetails && (
                <AnimeShelf 
                    personalStatus={status} 
                    shelfItems={shelfItems} 
                    setShelfItems={setShelfItems}
                    onClick = {(animeMalId) => viewAnimeDetails(animeMalId, shelfItems, setAnimeDetails)}>                            
                </AnimeShelf>)
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
                    onClose={() => setEditingAnime(null)}>
                </EditPanel>
            )}
            
            {anime && <AnimeSearchCard 
                passedAnimeData={anime}
                watchStatus={status}
                setShelfItems={setShelfItems}
                onClose={() => handleCloseSearchCard(setAnime)}
                ></AnimeSearchCard>
            }

            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>

        </div>
    )
}

export default Dropped