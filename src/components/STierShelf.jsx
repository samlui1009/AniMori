import { React, useState, useEffect } from 'react';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle  } from "react-icons/io";

import './STierShelf.css';


function STierShelf( {shelfItems=[], setShelfItems, onEdit} ) {

    const [openShelf, setOpenShelf] = useState(false);
    const [editPanel, setEditPanel] = useState(false);

    const [editingAnime, setEditingAnime] = useState(null);

    const toggleOpenShelf = (e) => {
        setOpenShelf((prev) => !prev);
    }

    const toggleCloseShelf = (e) => {
        setOpenShelf(false)
    }

    const handleDelete = async (animeMalId) => {
        try {
            await window.dbFunctions.deleteAnime(animeMalId);
        } catch {
            console.log("Anime could not be deleted");
        }
    }

    return (
        <div className="s-tier-ctn">
            {!openShelf && (
                <div className="shelf-btn-ctn">
                    <button className="shelf-btn" onClick={toggleOpenShelf}>
                    <IoMdArrowDropdownCircle className="open-logo"/>
                    <p>Open Library</p>
                    </button>
                </div>
            )}

            <div className={`shelf-ctn ${openShelf ? 'open' : 'closed'}`}>
                {shelfItems.map((anime) => (
                    <div className="anime-item" key={anime.mal_id}>
                        <img className="anime-cover"
                             onClick={() => onEdit(anime.mal_id)}
                             src={anime.image_url}
                             alt={anime.title}>                            
                        </img>
                        <h4 className="anime-title">{anime.title}</h4>
                    </div>
                ))}

                {shelfItems.length === 0 && (
                    <div className="single-display">
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