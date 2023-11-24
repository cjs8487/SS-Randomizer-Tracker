import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tracker from './Tracker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Options from './Options';
import FullAcknowledgement from './FullAcknowledgement';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/acknowledgement" element={<FullAcknowledgement />} />
                <Route path="/" element={<Options />} />
            </Routes>
        </Router>
    );
}

export default App;
