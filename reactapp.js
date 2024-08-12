// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await axios.get('http://localhost:3001/names');
      setNames(response.data);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  const addName = async () => {
    try {
      await axios.post('http://localhost:3001/add-name', { name });
      setName('');
      fetchNames();
    } catch (error) {
      console.error('Error adding name:', error);
    }
  };

  return (
    <div className="App">
      <h1>RSVP List</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={addName}>Submit</button>
      <h2>Names List</h2>
      <ul>
        {names.map((n) => (
          <li key={n.id}>{n.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
