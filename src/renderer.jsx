import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import OpeningPage from './pages/Opening.jsx';
import HomePage from './pages/Home.jsx';
import CurrentWatching from './pages/CurrentlyWatching.jsx';
import WatchedPage from './pages/Watched.jsx';
import TBWatchedPage from './pages/ToBeWatched.jsx'
import DroppedPage from './pages/Dropped.jsx';
import STiers from './pages/STierFavourites.jsx';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<OpeningPage></OpeningPage>}></Route>
                <Route path="/home" element={<HomePage></HomePage>}></Route>
                <Route path="/currently-watching" element={<CurrentWatching></CurrentWatching>}></Route>
                <Route path="/watched" element={<WatchedPage></WatchedPage>}></Route>
                <Route path="/to-be-watched" element={<TBWatchedPage></TBWatchedPage>}></Route>
                <Route path="/dropped" element={<DroppedPage></DroppedPage>}></Route>
                <Route path="/s-tiers" element={<STiers></STiers>}></Route>
            </Routes>
        </HashRouter>
    )
}

export default App

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>)