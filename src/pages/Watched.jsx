import { useState } from 'react';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';

import AnimeShelf from '../components/AnimeShelf.jsx';

import AnimeCard from '../components/AnimeCard.jsx';
import './Pages.css'

function Watched() {

    const status = "Watched";
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
                <h3 className="title">Watched ˙✧˖°📺 ⋆｡˚</h3>
                <p className="tagline">The Completed Bunch.</p>
            </div>
            <AnimeShelf personalStatus={status}></AnimeShelf>
            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>
            {anime && <AnimeCard passedAnimeData={anime}></AnimeCard>}
        </div>
    )
}

export default Watched