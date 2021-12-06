import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Albums from './components/Albums';
import Photos from './components/Photos'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <Albums/>}>
          </Route>
          <Route path="/photos/:title/:id" element={<Photos/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
