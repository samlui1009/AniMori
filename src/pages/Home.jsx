import NavigationBar from '../components/NavBar.jsx'
import DLMode from '../components/DayNightModeOptionBar.jsx';
import Statistics from '../components/Stats.jsx';
import CollectionSearchBar from '../components/CollectionSearchBar.jsx';
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
            <div className="collection-searchbar-ctn">
                <CollectionSearchBar></CollectionSearchBar>
            </div>
            <Statistics></Statistics>
        </div>
    )
}

export default Home