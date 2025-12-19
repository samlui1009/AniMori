import { useState, useEffect } from 'react';

import EditPanel from '../components/EditPanel.jsx';
import MALSearchBar from '../components/MALSearchBar.jsx';
import AnimeShelf from '../components/AnimeShelf.jsx';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';
import AnimeSearchCard from '../components/AnimeSearchCard.jsx';

import './Pages.css'

function ToBeWatched() {

    const status = "To Be Watched";
    const [shelfItems, setShelfItems] = useState([]);
    const [editingAnime, setEditingAnime] = useState(null);
    const [anime, setAnime] = useState(null);

    const handleEdit = async (animeMalId) => {
        const animeToEdit = shelfItems.find(anime => anime.mal_id === animeMalId);
        // Create a constant, called animeToEdit, where it will loop through array of shelf items to find the 
        // appropriate anime with the mal_id that matches the parameter we are passing into
        setEditingAnime(animeToEdit);
        console.log(animeToEdit);
        // For troubleshooting
        // setEditPanel(true);
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
                <h3 className="title">📺 To Watch 📺</h3>
                <p className="tagline">+1 to the never-ending pile.</p>
            </div>

            <div>
                <MALSearchBar variant="header" animeResult={setAnime}></MALSearchBar>
            </div>

            {!editingAnime && (
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
            
            {anime && 
                <AnimeSearchCard 
                passedAnimeData={anime} 
                watchStatus={status}
                setShelfItems={setShelfItems} 
                onClose={() => setAnime(null)}></AnimeSearchCard>}

            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>

        </div>
    )
}

export default ToBeWatched