import React from 'react';
import './App.css';
import Navbar from "./Navigation/Navbar";
import ListTransactions from "./Pages/Transactions/ListTransactions";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/transactions" element={<ListTransactions />}/>
        </Routes>
    </>
  );
}

export default App;
