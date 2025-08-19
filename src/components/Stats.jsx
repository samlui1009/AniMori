import './Stats.css';

function Stats() {
    return (
        <div className="stats-container">
            <h3>Your Stats</h3>
            <ul className="stats-list">
                <li>Total Watched</li>
                <li>Currently Watching</li>
                <li>Total Dropped</li>
            </ul>
            <div className="rate">
                <p className="completion-rate">Overall Completion Rate: </p>
            </div>
        </div>
    )
}

export default Stats