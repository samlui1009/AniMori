import NavigationBar from '../components/NavBar.jsx'
import DLMode from '../components/DayNightModeOptionBar.jsx';
import Statistics from '../components/Stats.jsx';

function Home() {
    return(
        <div>
            <DLMode></DLMode>
            <NavigationBar></NavigationBar>
            <Statistics></Statistics>
        </div>
    )
}

export default Home