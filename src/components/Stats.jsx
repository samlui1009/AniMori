import { useEffect, useState } from 'react';
import './Stats.css';

function Stats() {

    const [watched, setWatched] = useState(null);
    const [currentlyWatching, setCurrentlyWatching] = useState(null);
    const [dropped, setDropped] = useState(null);
    const [rate, setRate] = useState(null);
    // Default state is NULL

    useEffect(() => {
        const run = async () => {
            try {
                const watchedStats = await window.dbFunctions.getWatchedAnimeCount();
                const currentWatchStats = await window.dbFunctions.getWatchingAnimeCount();
                const droppedStats = await window.dbFunctions.getDroppedAnimeCount();
                const rate = await window.dbFunctions.getTotalAverageRating();

                setWatched(watchedStats)
                setCurrentlyWatching(currentWatchStats);
                setDropped(droppedStats);
                setRate(rate);
            } catch (e) {
                console.error("Failed to load watched content", e);
            }
        }
        run();
    }, []);

    return (
        <div className="stats-container">
            <h3 className="stats-title">Your Stats</h3>
            <ul className="stats-list">
                <li>Total Watched</li>
                <li>Currently Watching</li>
                <li>Total Dropped</li>
            </ul>
            <ul className="stats-numeric">
                <li>{watched}</li>
                <li>{currentlyWatching}</li>
                <li>{dropped}</li>
            </ul>
            {/* TODO: The CSS3 styling needs fixing here */}
            <div className="rate">
                <p className="avg-rate">Average Rating: {rate}</p>
            </div>
        </div>
    )
}

export default Stats