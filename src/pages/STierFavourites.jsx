import { useState } from 'react';

import STiers from '../components/STierShelf.jsx';
import MALSearchBar from '../components/MALSearchBar.jsx';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import NavSB from '../components/NavSideBar.jsx';
import AnimeSearchCard from '../components/AnimeSearchCard.jsx';

import './Pages.css'

function STierFavourites() {

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
                <h3 className="title">S-Tier Favourites 💕 ( ദ്ദി ˙ᗜ˙ ) </h3>
            </div>

            <div>
                <MALSearchBar variant="header" animeResult={setAnime}></MALSearchBar>
            </div>

            <STiers></STiers>
            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>
            
            {anime && <AnimeSearchCard passedAnimeData={anime}></AnimeSearchCard>}
        </div>
    )
}

export default STierFavourites