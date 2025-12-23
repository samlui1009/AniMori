import './AnimeSearchCard.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'; // Import the toggle icons

// THIS is the Anime "Search Results" card generated after searching
// for an anime with the API
function AnimeSearchCard( { passedAnimeData, watchStatus, setShelfItems, onClose}) {

    const [displayAnime, setDisplayAnime] = useState(false);
    
    if (!passedAnimeData) {
        return null;
    }
    // A guard here

    const handleClick = async (passedAnimeData, watchStatus) => {
        try {
            const newAnime = {
                mal_id: passedAnimeData.mal_id,
                title: passedAnimeData.title,
                image_url: passedAnimeData.images.jpg.image_url,
                episodes: passedAnimeData.episodes,
                personal_status: watchStatus,
                personal_rating: null,
                personal_comments: null,
                is_s_tier: 0
            }
            await window.dbFunctions.addNewAnime(newAnime);
            setShelfItems((prev) => [...prev, newAnime]);
            // console.log("Anime has been added to the library:", newAnime.title);
            onClose();
        } catch {
            console.log("Anime could not be added to your library!");
        }
    }

    useEffect(() => {
        setDisplayAnime(true);
    }, [passedAnimeData])

    return (
        <div>
            {displayAnime && (
                <div className="anime-info-ctn">
                <button className="close-btn" onClick={onClose}><FontAwesomeIcon icon={faSquareXmark} size="lg"/></button>
                <div className="anime-gen-info">
                    <h3 className="name">Anime Name: {passedAnimeData.title}</h3>
                    <p className="info">Total Episodes: {passedAnimeData.episodes}</p>
                    <p className="info">Anime Status: {passedAnimeData.status}</p>
                </div>
                <img className="anime-img" src={passedAnimeData.images.jpg.image_url} alt={passedAnimeData.title}></img>
                <div className="btn-ctn">
                    <button className="btn" onClick={() => handleClick(passedAnimeData, watchStatus)}>Add To Shelf</button>
                    {/* The above syntax ensures that the function only runs UPON clicking */}
                </div>
            </div>
            )}
        </div>
    )
}

export default AnimeSearchCard

// In order for multiple components to see the same 
// "live" data and update consistently, we MUST implement the state 
// At the common ancestor, which should be the "top" parent