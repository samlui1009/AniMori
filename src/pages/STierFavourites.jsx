import { useState, useEffect } from 'react';

import STiers from '../components/STierShelf.jsx';
import MALSearchBar from '../components/MALSearchBar.jsx';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';
import AnimeSearchCard from '../components/AnimeSearchCard.jsx';
import EditPanel from '../components/EditPanel.jsx'

import './Pages.css'

function STierFavourites() {

    const [anime, setAnime] = useState(null);
    const [shelfItems, setShelfItems] = useState([]);
    const [editingAnime, setEditingAnime] = useState(null);

    const handleEdit = async (animeMalId) => {
        const animeToEdit = shelfItems.find(anime => anime.mal_id === animeMalId);
        // Create a constant, called animeToEdit, where it will loop through array of shelf items to find the 
        // appropriate anime with the mal_id that matches the parameter we are passing into
        setEditingAnime(animeToEdit);
        console.log(animeToEdit);
    }

    const handleCloseSearchCard = async (e) => {
        setAnime(null);
    }

    useEffect(() => {
        const run = async () => {
            const sTierAnimeData = await window.dbFunctions.getAnimeLeanDataBySTier();
            setShelfItems(sTierAnimeData);
            console.log(sTierAnimeData);
        };
        run();
    }, []);
    // Don't forget the dependency array

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

            <div>
                <MALSearchBar variant="header" animeResult={setAnime}></MALSearchBar>
            </div>

            {!editingAnime && !anime && (
                <STiers
                    shelfItems={shelfItems}
                    setShelfItems={setShelfItems}
                    onEdit = {handleEdit}>
                </STiers>
            )}

            {editingAnime && (
                <EditPanel
                    animeToEdit={editingAnime}
                    onClose={() => setEditingAnime(null)}>
                </EditPanel>
            )}

            {anime && 
                <AnimeSearchCard 
                passedAnimeData={anime}
                setShelfItems={setShelfItems}
                onClose={handleCloseSearchCard}>
                </AnimeSearchCard>
            }

            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>

        </div>
    )
}

export default STierFavourites