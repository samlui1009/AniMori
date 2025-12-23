import { useState, useEffect } from 'react';

import AnimeShelf from '../components/AnimeShelf.jsx';
import OneShowPanel from '../components/DisplayOneShowPanel.jsx';
import MALSearchBar from '../components/MALSearchBar.jsx';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';
import AnimeSearchCard from '../components/AnimeSearchCard.jsx';
import EditPanel from '../components/EditPanel.jsx'
import './Pages.css'

function CurrentlyWatching() {

    const status = "Currently Watching";
    const [animeDetails, setAnimeDetails] = useState(null);
    const [shelfItems, setShelfItems] = useState([]);
    const [editingAnime, setEditingAnime] = useState(null);
    // This is for the search card
    const [anime, setAnime] = useState(null);

    const viewAnimeDetails = async (animeMalId) => {
        const animeDetails = shelfItems.find(anime => anime.mal_id === animeMalId);
        setAnimeDetails(animeDetails);
    }

    const handleEdit = async (animeMalId) => {
        const animeToEdit = shelfItems.find(anime => anime.mal_id === animeMalId);
        setEditingAnime(animeToEdit);
    }

    const handleAnimeDeletion = async (animeMalId) => {
        try {
            await window.dbFunctions.deleteAnime(animeMalId);
            const updatedShelfItems = shelfItems.filter(anime => anime.mal_id !== animeDetails.mal_id);
            setShelfItems(updatedShelfItems);
            setAnimeDetails(null);    
        } catch {
            console.log("Selected anime could not be deleted!");
        }
    }

    const handleCloseDisplayPanel = async (e) => {
        setAnimeDetails(null);
        setAnime(null);
        setEditingAnime(null);
    }

    const handleCloseSearchCard = async (e) => {
        setAnime(null);
    }

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
                <h3 className="title">↻ ◁ Current Fixations ▷ ↺</h3>
            </div>

            <div>
                <MALSearchBar variant="header" animeResult={setAnime}></MALSearchBar>
            </div>

            {!editingAnime && !anime && !animeDetails && (
                <AnimeShelf 
                    personalStatus={status} 
                    shelfItems={shelfItems} 
                    setShelfItems={setShelfItems}
                    onClick = {viewAnimeDetails}>                            
                </AnimeShelf>)
            }

            {!editingAnime && animeDetails && (
                <OneShowPanel
                    shelfItems={shelfItems}
                    animeMalId={animeDetails.mal_id}
                    onEdit={() => handleEdit(animeDetails.mal_id)}
                    onDelete={() => handleAnimeDeletion(animeDetails.mal_id)}
                    onCancel={handleCloseDisplayPanel}>
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
                onClose={handleCloseSearchCard}
                ></AnimeSearchCard>
            }

            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>
            
        </div>
    )
}

export default CurrentlyWatching