import { React, useEffect, useState } from 'react';

import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AnimeShelf.css';


export function AnimeSlider({allAnime, handleDelete}) {
    var settings = {
        dots: false,
        arrows: false,
        autoplay: false,
        infinite: true,
        initialSlide: 0,
        pauseOnHover: true,
        slidesToShow: 1
    }

    return (
        <Slider {...settings}>
            {allAnime.map((anime) => {
                return (
                    <div className="single-anime-display">
                        <img className="img"
                            key={anime.mal_id}
                            src={anime.image_url}
                        />
                        <p className="title">{anime.title}</p>
                        <div className="btn-nav">
                            <button className="btn">Edit</button>
                            <button className="btn" onClick={() => handleDelete(anime.mal_id)}>Delete</button>
                        </div>
                    </div>
                )
            })}
        </Slider>
    )
}

// This component displays ALL of the animes that the user has watched so far
// TODO: Need to incorporate the AliceCarousel
function AnimeShelf({ personalStatus }) {
    // Requires the {} to be "destructured"

    const [shelfItems, setShelfItems] = useState([]);
    // Currently, there should be an empty array - It must be an array in order for the "mapping" 
    // to work

    const handleDelete = async (animeMalId) => {
        try {
            await window.dbFunctions.deleteAnime(animeMalId);
        } catch {
            console.log("Anime could not be deleted");
        }
    }

    useEffect(() => {
        const run = async () => {
            const allAnimeData = await window.dbFunctions.getAnimeLeanDataByStatus(personalStatus);
            // Should just return back all registered anime data
            setShelfItems(allAnimeData);
            console.log(shelfItems);
        };
        run();
    }, [personalStatus]);

    return (
        <div className="nav-btns-ctn">
            <button className="nav-btn"><FontAwesomeIcon icon={faCircleArrowLeft}></FontAwesomeIcon></button>
            <div className="shelf-ctn">
                {shelfItems.length > 0 && (
                    <AnimeSlider allAnime={shelfItems} handleDelete={handleDelete}/>
                )}
                {shelfItems.length === 0 && (
                    <div className="single-anime-display">
                        <p className="content">No content yet! Try adding something! :)</p>
                    </div>
                )}
            </div>
            <button className="nav-btn"><FontAwesomeIcon icon={faCircleArrowRight}></FontAwesomeIcon></button>
        </div>
    )
}

export default AnimeShelf