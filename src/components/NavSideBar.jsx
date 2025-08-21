import './NavSideBar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';

function NavSideBar() {

    const [open, setOpen] = useState(false);
    // Initial state: Hamburger menu should NOT be open yet
    const [openModal, setOpenModal] = useState(false);
    // Initial state: Modal should NOT be open yet

    return (
        <div className="hamburger-ctn">
            <Hamburger 
                toggled={open} 
                toggle={setOpen}
                size={24}
                direction="right"
                distance="md"
                easing="ease-in"
                color="#7B6A68"/>
                
            {open &&
                <div className="open-menu">
                    <p className="menu-title">Quick Nav</p>
                    <ul className="open-menu-options">
                        <li className="qnav-item">
                            <Link to="/to-be-watched">📌 To Watch</Link>
                        </li>
                        <li className="qnav-item">
                            <Link to="/currently-watching">[ ▶︎ ] Watching</Link>
                        </li>
                        <li className="qnav-item">
                            <Link to="/watched">✅ Watched</Link>
                        </li>
                        <li className="qnav-item">
                            <Link to="/dropped">❌ Dropped</Link>
                        </li>
                        <li className="qnav-item">
                            <Link to="/s-tiers">⭐ S-Tiers</Link>
                        </li>
                        <li className="qnav-item">
                            <button className="find-anime-btn">⌕ Find Anime</button>
                            {/* Keep this for now temporarily - TODO: Needs modal pop-up */}
                        </li>
                    </ul>
                </div>}
        </div>
    )
}

export default NavSideBar

// TODO: USE THE HAMBURGER HERE!
// https://hamburger-react.netlify.app/