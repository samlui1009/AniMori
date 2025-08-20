import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import MALSB from '../components/MALSearchBar.jsx';
import './Pages.css'

function STierFavourites() {
    return(
        <div className="ctn">
            <DLMode></DLMode>
            <div className="header-ctn">
                <h3 className="title">S-Tier Favourites 💕 ( ദ്ദി ˙ᗜ˙ ) </h3>
            </div>
            <MALSB></MALSB>
            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>
        </div>
    )
}

export default STierFavourites