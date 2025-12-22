import React, { useEffect } from 'react';
import './DisplayOneShowPanel.css';
const DisplayOneShowPanel = ({ shelfItems, animeMalId, onEdit, onDelete, onCancel }) => {

    const animeToView = shelfItems.find(show => show.mal_id === animeMalId);
    const isSTier = animeToView.is_s_tier ? "Yes" : "No";

    return (
        <div className="display-one-show-panel">
            <h2 className="show-name">Showing Details For: {animeToView.title}</h2>
            <img src={animeToView.image_url} alt={`${animeToView.title} Cover`} className="show-img" />
            <div className="show-details">
                <h4>✏️ Comments:</h4> <p className="show-info">{animeToView.personal_comments || "No comments available. Add something!"}</p>
                <h4>✔️ Rating:</h4> <p className="show-info">{animeToView.personal_rating || "No rating available."}</p>
                <h4>🏅 S-Tier?</h4><p className="show-info">{isSTier}</p>
            </div>
            <div className="action-buttons">
                <button className="btn" onClick={onEdit}>Edit</button>
                <button className="btn" onClick={onDelete}>Delete</button>
                <button className="btn" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default DisplayOneShowPanel;
