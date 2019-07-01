import React from 'react';
import './App.css';
import logo from './logo2.png';
import TextInput from './TextInput.js'

function App() {
  
  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />
        hatmate
      </header>
      <TextInput />
    </div>
  );
}

export default App;
