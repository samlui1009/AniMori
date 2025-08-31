import './STierShelf.css';

import { React, useState, useEffect } from 'react';

import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export function AnimeSlider({ sTiers, handleDelete }) {
    var settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        infinite: true,
        initialSlide: 0,
        pauseOnHover: true,
        slidesToShow: 1
    }

    return (
        <Slider {...settings}>
            {sTiers.map((anime) => {
                return (
                    <div className="single-anime-display">
                        <img className="img"
                            key={anime.mal_id}
                            src={anime.image_url}
                        />
                        <p className="title">{anime.title}</p>
                        <p className="comments">{anime.personal_comments}</p>
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

// Technically, just a display shelf - Shouldn't allow modifications in it 
// Only permit them within the Watched, cause if you delete it here 
// Then it deletes it from the database!
function STierShelf() {

    const [shelfItems, setShelfItems] = useState([]);

    const handleDelete = async (animeMalId) => {
        try {
            await window.dbFunctions.deleteAnime(animeMalId);
        } catch {
            console.log("Anime could not be deleted");
        }
    }

    useEffect(() => {
        const run = async () => {
            const sTierAnimeData = await window.dbFunctions.getAnimeLeanDataBySTier();
            setShelfItems(sTierAnimeData);
            console.log(sTierAnimeData);
        };
        run();
    }, []);
    // Don't forget the dependency array

    return (
        <div className="s-tier-ctn">
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
        </div>
    )
}

// TODO: Add some more CSS modifications to this, such as:
// A star element/button/badge of honour

export default STierShelf