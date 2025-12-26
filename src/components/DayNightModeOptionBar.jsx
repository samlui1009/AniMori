import { useState, useEffect } from 'react';
import './DayNightModeOptionBar.css';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'; // Import the toggle icons

function DayNightModeOptionBar() {

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
    // Set this as a boolean FIRST

    useEffect(() => {
        const currTheme = isDarkMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", currTheme);
        localStorage.setItem("theme", currTheme);
    }, [isDarkMode]);
    // With the dependency array, to make sure it stops from re-loading constantly

    return (
        <div className="top-right-ctn">
            <RTHButton></RTHButton>
            <div className="light-dark-container" onClick={() => setIsDarkMode(!isDarkMode)}>
                <FontAwesomeIcon className="toggle-icon" icon={isDarkMode ? faToggleOn : faToggleOff} />
            </div>
        </div>
    )
}

export default DayNightModeOptionBar
