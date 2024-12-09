import React from 'react';
import SeatMap from './components/SeatMap';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Uçak Rezervasyon Sistemi</h1>
      </header>
      <main className="App-main">
        <SeatMap />
      </main>
    </div>
  );
}

export default App;
