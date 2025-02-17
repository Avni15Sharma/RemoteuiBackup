import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import NoMatch from './components/NoMatch';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>         
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NoMatch />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
