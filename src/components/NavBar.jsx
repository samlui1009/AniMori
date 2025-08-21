import './NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {

    const navigate = useNavigate();

    const goTBWatched = () => {
        navigate('/to-be-watched')
    }

    const goCurrentlyWatching = () => {
        navigate('/currently-watching')
    }

    const goWatched = () => {
        navigate('/watched')
    }

    const goDropped = () => {
        navigate('/dropped')
    }

    const goSTiers = () => {
        navigate('/s-tiers')
    }

    return (
        <div className="nav-container">
            <ul className="nav-bar">
                <button className="btn" onClick={goTBWatched}><li>To Watch</li></button>
                <button className="btn" onClick={goCurrentlyWatching}><li>Watching</li></button>
                <button className="btn" onClick={goWatched}><li>Watched</li></button>
                <button className="btn" onClick={goDropped}><li>Dropped</li></button>
                <button className="btn" onClick={goSTiers}><li>S-Tiers</li></button>
            </ul>
        </div>
    )
}

export default NavBar
