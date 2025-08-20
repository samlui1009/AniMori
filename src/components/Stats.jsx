import './Stats.css';

function Stats() {
    return (
        <div className="stats-container">
            <h3 className="stats-title">Your Stats</h3>
            <ul className="stats-list">
                <li>Total Watched</li>
                <li>Currently Watching</li>
                <li>Total Dropped</li>
            </ul>
            <ul className="stats-numeric">
                <li>Placeholder Value</li>
                <li>Placeholder Value</li>
                <li>Placeholder Value</li>
            </ul>
            {/* TODO: The CSS3 styling needs fixing here */}
            <div className="rate">
                <p className="completion-rate">Overall Completion Rate: </p>
            </div>
        </div>
    )
}

export default Stats