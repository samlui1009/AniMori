import './DayNightModeOptionBar.css';

import { CiLight } from "react-icons/ci";
import { MdModeNight } from 'react-icons/md';

function DayNightModeOptionBar() {
    return (
        <div className="light-dark-container">
            <input
                type="checkbox"
                id="check"
                className="light-dark-toggle"
                // onChange={handleChange}
                // checked={isChecked}
            >                
            </input>
        </div>
    )
}

export default DayNightModeOptionBar

// https://www.youtube.com/watch?v=sy-rRtT84CQ
// Follow this tutorial HERE