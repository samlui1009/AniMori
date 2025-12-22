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
                const watchedStats = await window.dbFunctions.getTotalCountByStatus('Watched');
                const droppedStats = await window.dbFunctions.getTotalCountByStatus('Dropped');
                const currentWatchStats = await window.dbFunctions.getTotalCountByStatus('Currently Watching');
                // To Be Watched status should be 'To Be Watched'
                const rate = await window.dbFunctions.getTotalAverageRating();
                const roundedRate = Math.round(rate*100)/100; 
                setWatched(watchedStats)
                setCurrentlyWatching(currentWatchStats);
                setDropped(droppedStats);
                setRate(roundedRate);
            } catch (e) {
                console.error("Failed to load watched content", e);
            }
        }
        run();
    }, []);
    // Questions here: Why the "run()"?

    return (
        <div className="stats-container">
            <h2 className="stats-title">Your Stats</h2>
            <ul className="stats-list">
                <li>Total Watched</li>
                <li>Currently Watching</li>
                <li>Total Dropped</li>
            </ul>
            <ul className="stats-numeric">
                <li>{watched ?? 0}</li>
                <li>{currentlyWatching ?? 0}</li>
                <li>{dropped ?? 0}</li>
            </ul>
            <div className="rate">
                <p className="avg-rate">Average Rating: {rate ?? 0}</p>
                {/* Either returns back the rate, or a 0 if there's nothing recorded */}
            </div>
        </div>
    )
}

export default Stats