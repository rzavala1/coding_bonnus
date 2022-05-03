import React from 'react';
import './App.css';
import Home from './components/Home';
import Callback from './components/Callback';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserState from "./context/UserState";

function App() {

  return (
    <div className="App">
      <UserState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart/callback" element={<Callback />} />
          </Routes>
        </BrowserRouter>
      </UserState>
    </div>

  );
}

export default App;
