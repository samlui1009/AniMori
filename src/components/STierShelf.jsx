import { React, useState, useEffect } from 'react';
import EditPanel from '../components/EditPanel.jsx';
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
                    <div>
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