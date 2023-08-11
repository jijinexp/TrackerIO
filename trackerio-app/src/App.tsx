import React from 'react';
import './App.css';
import Navbar from "./Navigation/Navbar";
import ListTransactions from "./Transactions/ListTransactions";

function App() {
  return (
    <div className="App">
       <Navbar/>
       <ListTransactions />
    </div>
  );
}

export default App;
