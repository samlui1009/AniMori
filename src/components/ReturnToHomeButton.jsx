import './ReturnToHomeButton.css';
import { useNavigate } from 'react-router-dom';

function ReturnToHomeButton() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <div>
            <button className="home-btn" onClick={handleClick}>Go Back To Home</button>
        </div>
    )
}

export default ReturnToHomeButton