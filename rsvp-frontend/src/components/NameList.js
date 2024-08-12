import React from 'react';

function NameList({ names }) {
  return (
    <ul>
      {names.map((name) => (
        <li key={name.id}>{name.name}</li>
      ))}
    </ul>
  );
}

export default NameList;
