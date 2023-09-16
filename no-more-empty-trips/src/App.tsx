import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './Layout';

function App() {
  return (
    <div className="App">
      <AppLayout />
      <input />
      <Routes>
        <Route path="/home" element={
          <p>
            HELLO THERE THIS IS HOME
          </p>
        }></Route>
        <Route path="/test" element={
          <p>
            asasdfasdfasdfasdfasdfasdf
          </p>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
