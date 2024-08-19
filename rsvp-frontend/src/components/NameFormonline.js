import React, { useState } from 'react';
import axios from 'axios';
const port = 3004;
const apiUrl = 'ec2-18-221-126-127.us-east-2.compute.amazonaws.com';

function NameFormonline({ onAddName }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${apiUrl}/api/names`, { name });
      console.log('Response from backend:', response.data);
      onAddName(response.data);
      setName('');
    } catch (error) {
      console.error('Error adding name:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NameForm;
