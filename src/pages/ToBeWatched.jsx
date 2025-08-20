import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import MALSB from '../components/MALSearchBar.jsx';
import './Pages.css'

function ToBeWatched() {
    return(
        <div className="ctn">
            <DLMode></DLMode>
            <div className="header-ctn">
                <h3 className="title">📺 To Watch 📺</h3>
                <p className="tagline">+1 to the never-ending pile.</p>
            </div>
            <MALSB></MALSB>
            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>
        </div>
    )
}

export default ToBeWatched