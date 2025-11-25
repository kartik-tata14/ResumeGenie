import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateResume from './pages/CreateResume';
import ResumeEditor from './pages/ResumeEditor';
import ExportResume from './pages/ExportResume';
import Templates from './pages/Templates';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CreateResume />} />
                <Route path="/editor" element={<ResumeEditor />} />
                <Route path="/export" element={<ExportResume />} />
                <Route path="/templates" element={<Templates />} />
            </Routes>
        </Router>
    );
}

export default App;