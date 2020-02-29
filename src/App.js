import React from 'react';
import './App.css';
// import logo from './logo.svg'
function App() {

  let img1 = 'src/static/images/1.jpg';
  let img2 = 'src/static/images/2.jpg';
  return (
    <div className="App">
      <header className="App-header">
        <img src={img1} className="App-logo" alt="logo" />
        <img src={img2} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

export default App;
