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
      <div id="home-header">
        <img src="/images/Lion.png" width="75px" height="75px" />
        <h1>Apex Casino</h1>
        <img src="/images/Lion.png" width="75px" height="75px" />
      </div>

      <div className="stats-container">
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <ol>
            {leaderboard.map((player, index) => (
              <li key={index}>
                {index + 1}: {player.Name} - $
                {player.LionBucks.toLocaleString()}{" "}
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
                  LionBucks: <span>${score.toLocaleString()}</span>
                </p>
                <SignOutButton />
              </>
            ) : (
              <>
                <h2>Watch an Ad for 1,000 Lion Bucks!</h2>
                <ReactPlayer
                  url="https://youtu.be/KT0U_JoxstU?si=kjD6wBt6iK2-HHhG"
                  width="400px"
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
          <button>
            <p>Blackjack</p>
            <img src="/images/Blackjack.png" height="125px" width="125px" />
          </button>
        </Link>

        <Link to="/Craps">
          <button>
            <p>Craps</p>
            <img src="/images/Craps.png" height="125px" width="125px" />
          </button>
        </Link>

        <Link to="/Poker">
          <button>
            <p>Poker</p>
            <img src="/images/Poker.png" height="125px" width="125px" />
          </button>
        </Link>

        <Link to="/Race">
          <button>
            <p>Race</p>
            <img src="/images/Race.png" height="125px" width="125px" />
          </button>
        </Link>

        <Link to="/Roulette">
          <button>
            <p>Roulette</p>
            <img src="/images/Roulette.png" height="125px" width="125px" />
          </button>
        </Link>

        <Link to="/Slots">
          <button>
            <p>Slots</p>
            <img src="/images/Slots.png" height="125px" width="125px" />
          </button>
        </Link>
      </div>
    </div>
  );
}
