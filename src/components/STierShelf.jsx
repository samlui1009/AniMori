import { React, useState } from 'react';
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle  } from "react-icons/io";
import STierBadge from '../assets/s-tier-badge.png';
import './STierShelf.css';

function STierShelf( {shelfItems=[], setShelfItems, onClick} ) {

    // ASSUME: Users should only be adding things to S-Tiers once they have finished the entire show
    const status = "Watched"

    const [openShelf, setOpenShelf] = useState(false);
    const [editPanel, setEditPanel] = useState(false);
    const [editingAnime, setEditingAnime] = useState(null);

    const toggleOpenShelf = (e) => {
        setOpenShelf((prev) => !prev);
    }

    const toggleCloseShelf = (e) => {
        setOpenShelf(false)
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
                        <img className="s-tier-badge" src={STierBadge} alt="S-Tier Badge"></img>
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
                        <p className="content">No S-Tiers yet! Aren't you the picky one?</p>
                    </div>
                )}

                <div className="close-shelf-btn-ctn">
                    <button className="shelf-btn" onClick={toggleCloseShelf}>
                    <IoMdArrowDropupCircle className="close-logo" />
                    <p>Close Library</p>
                    </button>
                </div>            

            </div>
        </div>
    )
}

export default STierShelf