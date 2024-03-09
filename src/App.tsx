import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Options from './Options';
import FullAcknowledgement from './FullAcknowledgement';
import TrackerContainer from './TrackerContainer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/tracker" element={<TrackerContainer />} />
                <Route path="/acknowledgement" element={<FullAcknowledgement />} />
                <Route path="/" element={<Options />} />
            </Routes>
        </Router>
    );
}

export default App;
