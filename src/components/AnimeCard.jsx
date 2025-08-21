import './AnimeCard.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'; // Import the toggle icons

function AnimeCard( { passedAnimeData }) {

    const [displayAnime, setDisplayAnime] = useState(false);
    
    if (!passedAnimeData) {
        return null;
    }
    // A guard here

    useEffect(() => {
        setDisplayAnime(true);
    }, [passedAnimeData])
    // Basically, useEffect is used to run a side effect elsewhere 
    // when something changes
    // It will re-run whenever any value within dependency array changes
    // Dependency arrays are integral - determines if React should re-run effect
    // [] = Runs only ONCE, but adding a parameter into it means that we run it
    // Whenever passedAnimeData changes
    // Without the dependency array, it renders every time - NOT GOOD!

    return (
        <div>
            {displayAnime && (
                <div className="anime-info-ctn">
                <button className="close-btn" onClick={() => setDisplayAnime(false)}><FontAwesomeIcon icon={faSquareXmark} size="lg"/></button>
                <div className="anime-gen-info">
                    <h3 className="name">Anime Name: {passedAnimeData.title}</h3>
                    <p className="info">Total Episodes: {passedAnimeData.episodes}</p>
                    <p className="info">Anime Status: {passedAnimeData.status}</p>
                </div>
                <img className="anime-img" src={passedAnimeData.images.jpg.image_url} alt={passedAnimeData.title}></img>
                <div className="btn-ctn">
                    <button className="btn">Add</button>
                    <button className="btn">Move</button>
                    <button className="btn">Remove</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnimeCard