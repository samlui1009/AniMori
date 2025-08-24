import { useEffect, useState } from 'react';
import './AnimeShelf.css';

function AnimeShelf({ personalStatus }) {
    // Requires the {} to be "destructured"

    const [shelfItems, setShelfItems] = useState([]);
    // Currently, there should be an empty array - It must be an array in order for the "mapping" 
    // to work

    useEffect(() => {
        const run = async () => {
            const allAnimeData = await window.dbFunctions.getAnimeLeanDataByStatus(personalStatus);
            // Should just return back all registered anime data
            setShelfItems(allAnimeData);
        };
        run();
    }, [personalStatus]);

    return (
        <div className="shelf-ctn">
            {shelfItems.map(anime => (
                <div className="anime-display">
                    <img 
                        key={anime.mal_id} 
                        src={anime.image_url} 
                    />
                    <p>{anime.title}</p>
                </div>
            ))}
        </div>
    )
}

export default AnimeShelf