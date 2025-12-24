import { useState, useEffect } from 'react';
import './DayNightModeOptionBar.css';
import RTHButton from '../components/ReturnToHomeButton.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'; // Import the toggle icons
// Imports to use the icons from this library

function DayNightModeOptionBar() {

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
    // Set this as a boolean FIRST

    useEffect(() => {
        const currTheme = isDarkMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", currTheme);
        // Still working up until here - Also, question: What does this do?
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

// https://www.youtube.com/watch?v=sy-rRtT84CQ
// Follow this tutorial HERE