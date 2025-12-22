import { React, useEffect, useState } from 'react';
import EditPanel from '../components/EditPanel.jsx';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle  } from "react-icons/io";

import './AnimeShelf.css';

// This component displays ALL of the animes that the user has watched so far
function AnimeShelf ( {shelfItems = [], setShelfItems, onClick} ) {
    // Requires the {} to be "destructured"

    // State to open up the collapsible anime shelf
    const [openShelf, setOpenShelf] = useState(false);
    const [editPanel, setEditPanel] = useState(false);
    // We should NOT be seeing the edit panel from this anime shelf

    // This state will be for editing the anime of selection thereafter
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
            setShelfItems(prev => prev.filter(anime => anime.mal_id !== animeMalId));
        } catch {
            console.log("Anime could not be deleted!");
        }
    }

    return (
        <div className="nav-btns-ctn">
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
                             onClick={() => onClick(anime.mal_id)}
                             src={anime.image_url}
                             alt={anime.title}>                            
                        </img>
                        <h4 className="anime-title">{anime.title}</h4>
                    </div>
                ))}

                {shelfItems.length === 0 && (
                    <div className="single-display">
                        <p className="content">No content yet! Add something!</p>
                    </div>
                )}

                <div className="close-shelf-btn-ctn">
                    <button className="shelf-btn" onClick={toggleCloseShelf}>
                    <IoMdArrowDropupCircle className="close-logo" />
                    <p>Close Library</p>
                    </button>
                </div>

                {editPanel && (
                    <div>
                        <EditPanel animeToEdit={editingAnime}
                        onClose={() => setEditPanel(false)}></EditPanel>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AnimeShelf