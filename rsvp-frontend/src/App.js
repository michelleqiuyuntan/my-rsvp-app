import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NameForm from './components/NameForm';
import NameList from './components/NameList';
const port = 3004;

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(`http://localhost:${port}/api/names`);
        setNames(response.data);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };

    fetchNames();
  }, []);

  const handleAddName = (newName) => {
    console.log('Adding new name:', newName);
    setNames((prevNames) => [...prevNames, newName]);
    console.log('Updated names:', [...names, newName]);
  };

  return (
    <div>
      <h1>RSVP Tool</h1>
      <NameForm onAddName={handleAddName} />
      <NameList names={names} />
    </div>
  );
}

export default App;