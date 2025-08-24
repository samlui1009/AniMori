import { useEffect, useState } from 'react';
import './AnimeShelf.css';

function AnimeShelf() {

    const [shelfItems, setShelfItems] = useState([]);
    // Currently, there should be an empty array - It must be an array in order for the "mapping" 
    // to work

    useEffect(() => {
        const run = async () => {
            const allImages = await window.dbFunctions.getWatchedAnimeImages();
            console.log("Fetched images:", allImages);
            setShelfItems(allImages);
        };
        run();
    }, []);

    return (
        <div className="shelf-ctn">
            {shelfItems.map(anime => (
                <img 
                    key={anime.id} 
                    src={anime.image_url} 
                    alt={anime.title || "anime"} 
                />
            ))}
        </div>
    )
}

export default AnimeShelf