import { useState, useEffect } from "react";
import { useAuthentication } from "../Services/authService";
import {
  getPosition,
  getScore,
  getTopFive,
  incrementScore,
  newUser,
} from "../Services/scoreService";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Blackjack from "./Blackjack";
import Craps from "./Craps";
import Poker from "./Poker";
import Race from "./Race";
import Roulette from "./Roulette";
import Slots from "./Slots";
import NoPage from "./NoPage";
import "./App.css";

export default function App() {
  const user = useAuthentication();

  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [position, setPosition] = useState(0);

  async function updateScore(amount) {
    await incrementScore(amount);
    getScore().then(setScore);
    getTopFive().then(setLeaderboard);
  }

  useEffect(() => {
    if (user) {
      newUser();
      getScore().then(setScore);
      getPosition().then(setPosition);
    }
    getTopFive().then(setLeaderboard);
  }, [user, score]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              score={score}
              user={user}
              leaderboard={leaderboard}
              position={position}
            />
          }
        />
        <Route
          path="/Blackjack"
          element={
            <Blackjack score={score} updateScore={updateScore} user={user} />
          }
        />
        <Route
          path="/Craps"
          element={
            <Craps score={score} updateScore={updateScore} user={user} />
          }
        />
        <Route
          path="/Poker"
          element={
            <Poker score={score} updateScore={updateScore} user={user} />
          }
        />
        <Route
          path="/Race"
          element={<Race score={score} updateScore={updateScore} user={user} />}
        />
        <Route
          path="/Roulette"
          element={
            <Roulette score={score} updateScore={updateScore} user={user} />
          }
        />
        <Route
          path="/Slots"
          element={
            <Slots score={score} updateScore={updateScore} user={user} />
          }
        />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
