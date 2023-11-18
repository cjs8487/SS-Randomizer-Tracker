import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tracker from './Tracker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Options from './Options';
import FullAcknowledgement from './FullAcknowledgement';
import EntranceTracker from './entranceTracker/EntranceTracker';

function App() {
    return (
        <Router className="App">
            <Routes>
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/acknowledgement" element={<FullAcknowledgement />} />
                <Route path="/entranceTracker" element={<EntranceTracker />} />
                <Route path="/" element={<Options />} />
            </Routes>
        </Router>
    );
}

export default App;
