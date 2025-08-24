import { useState } from 'react';
import AnimeShelf from '../components/AnimeShelf.jsx';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';
import AnimeSearchCard from '../components/AnimeSearchCard.jsx';
import './Pages.css'

function CurrentlyWatching() {

    const status = "Currently Watching";
    const [anime, setAnime] = useState(null);

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
            <AnimeShelf personalStatus={status}></AnimeShelf>
            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>
            {anime && <AnimeSearchCard passedAnimeData={anime}></AnimeSearchCard>}
        </div>
    )
}

export default CurrentlyWatching