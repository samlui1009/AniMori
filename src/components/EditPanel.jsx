import {React, useEffect, useState } from 'react';
import './EditPanel.css';
import FiveStarRating from './FiveStarRatingBar.jsx';

function EditPanel({ animeToEdit, onClose }) {

    const [newRating, setNewRating] = useState(0);

    // Function logic to handle a "Cancellation" for the edit
    const handleCancel = (e) => {
        e.preventDefault();
        onClose();
    }

    const handleEditSubmission = async (e) => {
        e.preventDefault();
        // console.log("Handler fired!");
        // console.log("Attempting to edit: ", animeToEdit.title);

        try {
            const newComments = document.querySelector(".comments-section").value;
            const newStatus = document.querySelector(".watch-status-select").value;
            const isSTier = document.querySelector(".s-tier-check").checked ? 1 : 0;

            console.log(newComments);
            console.log(newStatus);

            if (newComments) {
                await window.dbFunctions.updateAnimeField("personal_comments", newComments, animeToEdit.mal_id);
                console.log("Updated comments!");
            }
            if (newStatus) {
                await window.dbFunctions.updateAnimeField("personal_status", newStatus, animeToEdit.mal_id);
                console.log("Updated status!");
            }
            if (newRating > 0 && newRating <= 5) {
                await window.dbFunctions.updateAnimeField("personal_rating", newRating, animeToEdit.mal_id);
                console.log("Updated rating!");
            }
            if (isSTier !== null) {
                await window.dbFunctions.updateAnimeField("is_s_tier", isSTier, animeToEdit.mal_id);
                console.log("Updated S-Tier status!");
            }
            console.log("Anime has been successfully edited!");
        } catch (error) {
            console.log("Anime could not be edited!");
        }
    }

    return (
        <div className="edit-panel-ctn">
                <form className="edit-form" onSubmit={handleEditSubmission}>
                <h2>Currently Editing: {animeToEdit.title}</h2>
                <img className="show-img" src={animeToEdit.image_url}></img>
                <label htmlFor="comments">Comments:</label>
                <textarea className="comments-section"></textarea>
                <label htmlFor="watch-status">Change Watch Status To: </label>
                <select className="watch-status-select" id="watch-status">
                    <option className="opt" value="Watched">Watched</option>
                    <option className="opt" value="To Watch">To Watch</option>
                    <option className="opt" value="Watching">Currently Watching</option>
                    <option className="opt" value="Dropped">Dropped</option>
                </select>
                <label htmlFor="rating">Change Your Rating:</label>
                <FiveStarRating value={newRating} onChange={setNewRating}></FiveStarRating>
                <label htmlFor="checkbox">S-Tier?</label>
                <input className="s-tier-check" type="checkbox"></input>
                <div className="btn-ctn">
                    <input className="btn" type="submit"></input>
                    <button className="btn" onClick={handleCancel}>Cancel</button>
                </div>
                </form>
        </div>
    )
}

export default EditPanel

