import {React, useEffect, useState } from 'react';
import './EditPanel.css';

function EditPanel({ animeToEdit, onClose }) {

    // Function logic to handle a "Cancellation" for the edit
    const handleCancel = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleEditSubmission = async () => {
        try {

        } catch {
            console.log("Anime could not be edited!");
        }
    }

    return (
        <div className="edit-panel-ctn">
                <h5>Currently Editing: {animeToEdit.title}</h5>
                <form className="edit-form">
                <label for="comments">Comments:</label>
                <textarea className="comments-section"></textarea>
                <label for="watch-status">Change Watch Status To: </label>
                <select className="watch-status-select" id="watch-status">
                    <option className="opt" value="Watched">Watched</option>
                    <option className="opt" value="To Watch">To Watch</option>
                    <option className="opt" value="Watching">Currently Watching</option>
                    <option className="opt" value="Dropped">Dropped</option>
                </select>
                <label for="checkbox">S-Tier?</label>
                <input className="s-tier-check" type="checkbox"></input>
                <div className="btn-ctn">
                    <input className="btn" type="Submit"></input>
                    <button className="btn" onClick={handleCancel}>Cancel</button>
                </div>
                </form>
        </div>
    )
}

export default EditPanel

