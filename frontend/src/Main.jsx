import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Simulator from './pages/Simulator';
import Conversation from './pages/Conversation';
import Admin from './pages/Admin';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/simulator/:topicid" element={<Conversation/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
