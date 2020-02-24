import React from 'react';


function App() {

  return (
    <div className = "App" >

      <h1>Design Tokens</h1>
        <button className = "primary" onClick={function(){generateStyles() }}>Generate Tokens</button>
    </div>

  );
};

function generateStyles() {
  fetch("http://localhost:3001/api/build", {
    method: "GET",
  });
};

export default App;
