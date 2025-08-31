import { React, useEffect, useState } from 'react';

import Slider from 'react-slick';
import EditPanel from '../components/EditPanel.jsx';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AnimeShelf.css';

export function PrevButtonArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div 
            className={className}
            style = {{ ...style}}
            onClick={onClick}>
            <FontAwesomeIcon icon={faCircleArrowLeft}></FontAwesomeIcon>       
        </div>
    )
}

export function NextButtonArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div 
            className={className}
            style = {{ ...style}}
            onClick={onClick}>
            <FontAwesomeIcon icon={faCircleArrowRight}></FontAwesomeIcon>       
        </div>
    )
}

export function AnimeSlider({allAnime, handleEdit, handleDelete}) {
    var settings = {
        dots: false,
        arrows: true,
        autoplay: true,
        infinite: true,
        initialSlide: 0,
        pauseOnHover: true,
        slidesToShow: 1,
        autoplaySpeed: 3000,
        cssEase: "linear",
        prevArrow: <PrevButtonArrow></PrevButtonArrow>,
        nextArrow: <NextButtonArrow></NextButtonArrow>
    }

    return (
        <Slider {...settings} className="slick-slider">
            {allAnime.map((anime) => {
                return (
                    <div className="single-anime-display">
                        <img className="img"
                            key={anime.mal_id}
                            src={anime.image_url}
                        />
                        <p className="title">{anime.title}</p>
                        <p className="comments">{anime.personal_comments}</p>
                        <div className="btn-nav">
                            <button className="btn" onClick={() => handleEdit(anime.mal_id)}>Edit</button>
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
    const [editPanel, setEditPanel] = useState(false);
    // We should NOT be seeing the edit panel from this anime shelf
    const [editingAnime, setEditingAnime] = useState(null);

    const handleEdit = async (animeMalId) => {
        const animeToEdit = shelfItems.find(anime => anime.mal_id === animeMalId);
        // Create a constant, called animeToEdit, where it will loop through array of shelf items to find the 
        // appropriate anime with the mal_id that matches the parameter we are passing into
        setEditingAnime(animeToEdit);
        console.log(animeToEdit);
        // For troubleshooting
        setEditPanel(true);
    }

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
            <div className="shelf-ctn">
                {shelfItems.length > 0 && !editPanel && (
                    <AnimeSlider allAnime={shelfItems} handleDelete={handleDelete} handleEdit={handleEdit}/>
                )}

                {shelfItems.length === 0 && (
                    <div className="single-anime-display">
                        <p className="content">No content yet! Try adding something! :)</p>
                    </div>
                )}

                {editPanel && (
                    <div>
                        <EditPanel animeToEdit={editingAnime}></EditPanel>
                    </div>
                )}

            </div>
        </div>
    )
}

export default AnimeShelf