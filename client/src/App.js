import React from 'react';


function App() {

  return (
    <div className = "App" >

      <h1>Design Tokens</h1>
        <button onClick={function(){generateStyles() }}>
          <span>Generate Tokens</span>
        </button>
        <button onClick={function(){deleteStyles() }}>
          <span>Delete Tokens</span>
        </button>
      <div className="figmaPreview">
          <iframe src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FklLtlH02wB1UDeAEyNeUJ9%2FDesign-Tokens%3Fnode-id%3D1%253A31"></iframe>
      </div>
    </div>

  );
};

function generateStyles() {
  fetch("http://localhost:3001/api/build", {
    method: "GET",
  });
};


function deleteStyles() {
  fetch("http://localhost:3001/api/delete", {
    method: "GET",
  });
};
export default App;
