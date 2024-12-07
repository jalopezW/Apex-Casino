import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { SignIn, SignOutButton } from "./auth";
import ReactPlayer from "react-player";

export default function Home({
  score,
  user,
  leaderboard,
  position,
  updateScore,
}) {
  return (
    <div className="container">
      <h1>Apex Casino</h1>

      <div className="stats-container">
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <ol>
            {leaderboard.map((player, index) => (
              <li key={index}>
                {" "}
                {index + 1}: {player.Name} - {player.LionBucks.toLocaleString()}{" "}
              </li>
            ))}
          </ol>
        </div>

        <div className="player-score">
          {user ? (
            score > 0 ? (
              <>
                <h2>Your Score</h2>
                <p>
                  Position: <span>#{position}</span>
                </p>
                <p>
                  Score: <span>{score.toLocaleString()}</span>
                </p>
                <SignOutButton />
              </>
            ) : (
              <>
                <h2>Watch an Ad for 1,000 Lion Bucks!</h2>
                <ReactPlayer
                  url="https://youtu.be/KT0U_JoxstU?si=kjD6wBt6iK2-HHhG"
                  width="300px"
                  height="250px"
                  onEnded={() => updateScore(1000)}
                />
                <SignOutButton />
              </>
            )
          ) : (
            <>
              <h2>Sign in to see your stats!</h2>
              <SignIn />
            </>
          )}
        </div>
      </div>

      <div className="game-buttons">
        <Link to="/Blackjack">
          <button>Blackjack</button>
        </Link>

        <Link to="/Craps">
          <button>Craps</button>
        </Link>

        <Link to="/Poker">
          <button>Poker</button>
        </Link>

        <Link to="/Race">
          <button>Race</button>
        </Link>

        <Link to="/Roulette">
          <button>Roulette</button>
        </Link>

        <Link to="/Slots">
          <button>Slots</button>
        </Link>
      </div>
    </div>
  );
}
