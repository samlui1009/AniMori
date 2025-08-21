import './AnimeCard.css';

function AnimeCard( { passedAnimeData }) {
    
    if (!passedAnimeData) {
        return null;
    }
    // A guard here

    return (
        <div className="anime-info-ctn">
            <div className="anime-gen-info">
                <h3 className="name">Anime Name: {passedAnimeData.title}</h3>
                <p>Total Episodes: {passedAnimeData.episodes}</p>
                <p>Anime Status: {passedAnimeData.status}</p>
            </div>
            <img className="anime-img" src={passedAnimeData.images.jpg.image_url} alt={passedAnimeData.title}></img>
            <div className="btn-ctn">
                <button className="btn">Add</button>
                <button className="btn">Move</button>
                <button className="btn">Remove</button>
            </div>
        </div>
    )
}

export default AnimeCard