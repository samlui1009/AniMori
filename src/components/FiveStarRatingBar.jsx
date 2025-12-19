import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './FiveStarRatingBar.css';

function FiveStarRatingBar() {

    const [rating, setRating] = useState(null)
    const [rateColor, setColor] = useState(null)

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const currentRate = index + 1
                return (
                        <label className="rating-bar-ctn">
                            <input type="radio" name="rate" className="rating-bar"
                            value={currentRate}
                            onClick = {() => setRating(currentRate)}/>

                            <FaStar className="star"
                            size={15}
                            color= { currentRate <= (rateColor || rating) ? "gold" : "grey"} />
                        </label>
                )
            })}
        </div>
    )
}

export default FiveStarRatingBar

// https://www.youtube.com/watch?v=BmhU_MoxNqQ