import React from 'react';
import EditPanel from '.components/EditPanel.jsx';


const DisplayOneShowPanel = ({ show, onEdit, onDelete, onCancel }) => {
    const { comments, rating, isSTier } = show;

    return (
        <div className="display-one-show-panel">
            <h2>Show Details</h2>
            <div className="show-details">
                <p><strong>Comments:</strong> {comments || 'No comments available.'}</p>
                <p><strong>Rating:</strong> {rating ? `${rating}/5` : 'No rating available.'}</p>
                <p><strong>S-Tier:</strong> {isSTier ? 'Yes' : 'No'}</p>
            </div>
            <div className="action-buttons">
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default DisplayOneShowPanel;
