import './Opening.css';
import Typewriter from 'typewriter-effect';
// Import statement
import DLToggle from '../components/DayNightModeOptionBar.jsx';
import { useNavigate } from 'react-router-dom';

function Opening() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <div>
            <div className="main-div">
            <div className="dl-ctn">
                <DLToggle></DLToggle>
            </div>
            {/* Toggle is added here, no CSS styling or logic to toggle light/dark mode just yet */}
            <div className="header-div">
                <Typewriter className="header-typewriter"
                    options={{
                        strings: ['AniMori🌱', 'アニ森🌱'],
                        autoStart: true,
                        pauseFor: 1500,
                        loop: true,
                        delay: 80, 
                        deleteSpeed: 50,
                        wrapperClassName: 'typeWriterText'
                    }}
                />
                <p className="question">What will you watch today?</p>
                <div className="btn-container">
                    <button className="start-btn" onClick={handleClick}>Track Your Anime</button>
                    {/* Navigation works! Yay :D */}
                        {/* <button className="surprise-btn">Surprise Me!</button> */}
                        {/* Take out this button for now - Not sure if I need it */}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Opening