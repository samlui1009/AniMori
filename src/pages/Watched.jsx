import RTHButton from '../components/ReturnToHomeButton.jsx';
import DLMode from '../components/DayNightModeOptionBar.jsx';
import MALSB from '../components/MALSearchBar.jsx';
import './Pages.css'

function Watched() {
    return(
        <div className="ctn">
            <DLMode></DLMode>
            <div className="header-ctn">
                <h3 className="title">Watched ˙✧˖°📺 ⋆｡˚</h3>
                <p className="tagline">The Completed Bunch.</p>
            </div>
            <MALSB></MALSB>
            <div className="btn-container">
                <RTHButton className="home-btn"></RTHButton>
            </div>
        </div>
    )
}

export default Watched