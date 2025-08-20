import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import MALSB from '../components/MALSearchBar.jsx';
import './Pages.css'

function Dropped() {
    return(
        <div className="ctn">
            <DLMode></DLMode>
            <div className="header-ctn">
                <h3 className="title">🗑️ Dropped 🗑️</h3>
                <p className="tagline">( ˵ •̀ □ •́ ˵ ): Enough said!</p>
            </div>
            <MALSB></MALSB>
            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>
        </div>
    )
}

export default Dropped