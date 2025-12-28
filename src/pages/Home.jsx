import NavigationBar from '../components/NavBar.jsx'
import DLMode from '../components/DayNightModeOptionBar.jsx';
import Statistics from '../components/Stats.jsx';
import './Home.css';

function Home() {
    return(
        <div>
            <div className="dl-ctn">
                <DLMode></DLMode>
            </div>
            <div className="main-nav-ctn">
                <NavigationBar></NavigationBar>
            </div>
            <Statistics></Statistics>
        </div>
    )
}

export default Home