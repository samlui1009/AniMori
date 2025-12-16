import { useState, useEffect } from 'react';
import AnimeShelf from '../components/AnimeShelf.jsx';

import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';

import AnimeSearchCard from '../components/AnimeSearchCard.jsx';

import './Pages.css'

function ToBeWatched() {

    const status = "To Be Watched";
    const [shelfItems, setShelfItems] = useState([]);
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
                <h3 className="title">📺 To Watch 📺</h3>
                <p className="tagline">+1 to the never-ending pile.</p>
            </div>
            <AnimeShelf personalStatus={status} setShelfItems={setShelfItems}></AnimeShelf>
            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>
            {anime && <AnimeSearchCard passedAnimeData={anime} watchStatus={status}></AnimeSearchCard>}
        </div>
    )
}

export default ToBeWatched