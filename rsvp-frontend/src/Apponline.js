import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NameFormonline from './components/NameFormonline';
import NameList from './components/NameList';
const port = 3004;

const apiUrl = 'http://ec2-18-223-21-34.us-east-2.compute.amazonaws.com:3004';

function Apponline() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/names`);
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
      <NameFormonline onAddName={handleAddName} />
      <NameList names={names} />
    </div>
  );
}

export default Apponline;
