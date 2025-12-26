import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './FiveStarRatingBar.css';

function FiveStarRatingBar({ value = 0, onChange }) {

    const [rating, setRating] = useState(0);

    return (
        <div>
            {[1, 2, 3, 4, 5].map((num) => {
                return (
                        <label key={num} className="rating-bar-ctn">
                            <input type="radio" name="rate" className="rating-bar"
                            onClick = {() => onChange?.(num)}/>

                            <FaStar className="star"
                            size={15}
                            color= { num <= value ? "gold" : "grey"} />
                        </label>
                )
            })}
        </div>
    )
}

export default FiveStarRatingBar
