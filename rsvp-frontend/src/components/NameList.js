import React from 'react';

function NameList({ names }) {
  if (!Array.isArray(names)) {
    return <div>No names available</div>;
  }
  
  return (
    <ul>
      {names.map((name) => (
        <li key={name.id}>{name.name}</li>
      ))}
    </ul>
  );
}

export default NameList;
