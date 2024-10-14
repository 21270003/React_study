import logo from './logo.svg';
import React, { createContext, useContext } from 'react';
import './App.css';

const themeDefault = { border: '5px solid green' };
const themeContext = createContext(themeDefault);

function App() {
  const theme = useContext(themeContext);
  console.log('theme', theme);
  return (
    <div className="root" style={theme}>
      <h1>Hello World!</h1>
      <Sub1 />
    </div>
  );
}

function Sub1() {
  const theme = useContext(themeContext);
  return (
    <themeContext.Provider value = {{border: '5px solid green '}}>
      <div className="root" style={theme}>
        <h1>Sub1</h1>
        <Sub2 />
      </div>
    </themeContext.Provider>
  );
}

function Sub2() {
  const theme = useContext(themeContext);
  return (
    <div className="root" style={theme}>
      <h1>Sub2</h1>
      <Sub3 />
    </div>
  );
}

function Sub3() {
  const theme = useContext(themeContext);
  return (
    <div className="root" style={theme}>
      <h1>Sub3</h1>
    </div>
  );
}

export default App;
