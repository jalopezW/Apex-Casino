import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return (
        <div className="container">
            {/* Header */}
            <h1>Casino</h1>

            {/* Leaderboard and Player Score Side-by-Side */}
            <div className="stats-container">
                {/* Leaderboard Section */}
                <div className="leaderboard">
                    <h2>Leaderboard</h2>
                    <ol>
                        <li>1. Ray - 10,000</li>
                        <li>2. Andrew- 8,900</li>
                        <li>3. Iggy - 7,800</li>
                        <li>4. J - 6,700</li>
                        <li>5. JJ - 5,600</li>
                    </ol>
                </div>

                {/* Player Score Section */}
                <div className="player-score">
                    <h2>Your Score</h2>
                    <p>Position: <span>#3</span></p>
                    <p>Score: <span>7,800</span></p>
                    <button>Sign In</button>
                </div>
            </div>

            {/* Game Buttons Section */}
            <div className="game-buttons">
                <button>
                    <Link to="/Blackjack">Blackjack</Link>
                </button>
                <button>
                    <Link to="/Craps">Craps</Link>
                </button>
                <button>
                    <Link to="/Plinko">Plinko</Link>
                </button>
                <button>
                    <Link to="/Poker">Poker</Link>
                </button>
                <button>
                    <Link to="/Race">Race</Link>
                </button>
                <button>
                    <Link to="/Roulette">Roulette</Link>
                </button>
                <button>
                    <Link to="/Slots">Slots</Link>
                </button>
            </div>
        </div>
    );
}
