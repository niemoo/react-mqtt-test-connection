import React from 'react';
import HookMqtt from './components/Hook/';
// Hook or Class
// import ClassMqtt from './components/Class/'
import './App.css';
import Connect from './components/Connect';

function App() {
  return (
    <div className="App">
      <HookMqtt />
    </div>
  );
}

export default App;
