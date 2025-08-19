import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
// https://stackoverflow.com/questions/36505404/how-to-use-react-router-with-electron
// Why don't we need BrowserRouter like in SipLy/portfolio?
// Because HashRouter is meant for FILE-BASED ENVIRONMENTS like this!
import OpeningPage from './pages/Opening.jsx';
import HomePage from './pages/Home.jsx';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<OpeningPage></OpeningPage>}></Route>
                <Route path="/home" element={<HomePage></HomePage>}></Route>
            </Routes>
        </HashRouter>
    )
}

export default App

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>)