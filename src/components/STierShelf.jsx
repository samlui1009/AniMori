import './STierShelf.css';

import Slider from 'react-slick';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';


// Technically, just a display shelf - Shouldn't allow modifications in it 
// Only permit them within the Watched, cause if you delete it here 
// Then it deletes it from the database!
function STierShelf() {

    const [shelfItems, setShelfItems] = useState([]);

    useEffect(() => {
        const run = async () => {
            const sTierAnimeData = await window.dbFunctions.getAnimeLeanDataBySTier();
            setShelfItems(sTierAnimeData);
        };
        run();
    }, []);
    // Don't forget the dependency array

    return (
        <div className="s-tier-ctn">
            <button className="nav-btn"><FontAwesomeIcon icon={faCircleArrowLeft}></FontAwesomeIcon></button>
            <div className="shelf-ctn">
                {shelfItems.map(anime => (
                    <div className="single-anime-display">
                        <img className="img"
                            key={anime.mal_id} 
                            src={anime.image_url} 
                        />
                        <p className="title">{anime.title}</p>
                        <div className="btn-nav">
                            <button className="btn">Edit</button>
                        </div>
                    </div>
                ))}
                {shelfItems.length === 0 && (
                    <div className="single-anime-display">
                        <p className="content">No S-Tiers yet! Aren't you the picky one?</p>
                    </div>
                )}
            </div>
            <button className="nav-btn"><FontAwesomeIcon icon={faCircleArrowRight}></FontAwesomeIcon></button>
        </div>
    )
}

// TODO: Add some more CSS modifications to this, such as:
// A star element/button/badge of honour

export default STierShelf