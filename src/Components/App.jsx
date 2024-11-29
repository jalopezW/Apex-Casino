import { useState, useEffect } from 'react'
import { useAuthentication } from '../Services/authService'
import { auth } from "../firebaseConfig"
import { newUser } from '../Services/scoreService';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"
import Blackjack from "./Blackjack"
import Craps from "./Craps"
import Plinko from "./Plinko"
import Poker from "./Poker"
import Race from "./Race"
import Roulette from "./Roulette"
import Slots from "./Slots"
import NoPage from './NoPage';
import './App.css'

export default function App() {
  
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Blackjack" element={<Blackjack />} />
        <Route path="/Craps" element={<Craps />} />
        <Route path="/Plinko" element={<Plinko />} />
        <Route path="/Poker" element={<Poker />} />
        <Route path="/Race" element={<Race />} />
        <Route path="/Roulette" element={<Roulette />} />
        <Route path="/Slots" element={<Slots />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
  </BrowserRouter>
  )
};

