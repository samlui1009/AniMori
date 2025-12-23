import { useState, useEffect } from 'react';

import EditPanel from '../components/EditPanel.jsx';
import OneShowPanel from '../components/DisplayOneShowPanel.jsx';
import MALSearchBar from '../components/MALSearchBar.jsx';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';
import AnimeShelf from '../components/AnimeShelf.jsx';
import AnimeSearchCard from '../components/AnimeSearchCard.jsx';

import './Pages.css'

function Watched() {

    const status = "Watched";
    const [animeDetails, setAnimeDetails] = useState(null);
    const [shelfItems, setShelfItems] = useState([]);
    const [editingAnime, setEditingAnime] = useState(null);
    const [anime, setAnime] = useState(null);

    const viewAnimeDetails = async (animeMalId) => {
        const animeDetails = shelfItems.find(anime => anime.mal_id === animeMalId);
        setAnimeDetails(animeDetails);
    }

    const handleEdit = async (animeMalId) => {
        const animeToEdit = shelfItems.find(anime => anime.mal_id === animeMalId);
        // Create a constant, called animeToEdit, where it will loop through array of shelf items to find the 
        // appropriate anime with the mal_id that matches the parameter we are passing into
        setEditingAnime(animeToEdit);
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
                <h3 className="title">Watched ˙✧˖°📺 ⋆｡˚</h3>
                <p className="tagline">The Completed Bunch.</p>
            </div>

            <div>
                <MALSearchBar variant="header" animeResult={setAnime}></MALSearchBar>
            </div>

            {!editingAnime && !anime && !animeDetails &&  (
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
                    onDelete={async () => {
                        await window.dbFunctions.deleteAnimeByMalId(animeMalId);
                        const updatedShelfItems = shelfItems.filter(anime => anime.mal_id !== animeDetails.mal_id);
                        setShelfItems(updatedShelfItems);
                        setAnimeDetails(null);
                    }}
                    onClose={() => setAnimeDetails(null)}>
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
                      onClose={handleCloseSearchCard}></AnimeSearchCard>}

            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>


        </div>
    )
}

export default Watched