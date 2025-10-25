import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ConsumerDashboard from './pages/ConsumerDashboard';
import ProducerDashboard from './pages/ProducerDashboard';
import AdminDashboard from './pages/admindashboard';
import AdminPanal from './pages/adminPanal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/consumer" replace />} />
        <Route path="/consumer" element={<ConsumerDashboard />} />
        <Route path="/producer" element={<ProducerDashboard />} />
        <Route path="/adminb" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminPanal />} />
      </Routes>
    </Router>
  );
}

export default App;
