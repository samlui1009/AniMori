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
        // Create a constant, called animeDetails, where it will loop through array of shelf items to find the 
        // appropriate anime with the mal_id that matches the parameter we are passing into
        console.log(animeDetails);
        // For troubleshooting
        setAnimeDetails(animeDetails);
    }

    const handleEdit = async (animeMalId) => {
        const animeToEdit = shelfItems.find(anime => anime.mal_id === animeMalId);
        // Create a constant, called animeToEdit, where it will loop through array of shelf items to find the 
        // appropriate anime with the mal_id that matches the parameter we are passing into
        setEditingAnime(animeToEdit);
        console.log(animeToEdit);
        // For troubleshooting
        // setEditPanel(true);
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

            {!editingAnime && !anime && animeDetails && (
                <OneShowPanel></OneShowPanel>)
            }

            {!editingAnime && !anime && (
                <AnimeShelf 
                    personalStatus={status} 
                    shelfItems={shelfItems} 
                    setShelfItems={setShelfItems}
                    onEdit = {handleEdit}>                            
                </AnimeShelf>)
            }

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