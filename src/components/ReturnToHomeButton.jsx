import './ReturnToHomeButton.css';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

function ReturnToHomeButton() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <div>
            <button className="home-btn" onClick={handleClick}><FaHome className="home-logo"></FaHome> Home</button>
        </div>
    )
}

export default ReturnToHomeButton