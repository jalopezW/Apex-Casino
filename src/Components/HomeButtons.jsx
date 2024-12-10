import { Link } from "react-router-dom";

export default function HomeButtons() {
  return (
    <div className="home-buttons">
      <Link to="/Blackjack">
        <button>
          <p>Blackjack</p>
          <img src="/images/Blackjack.png" />
        </button>
      </Link>

      <Link to="/Craps">
        <button>
          <p>Craps</p>
          <img src="/images/Craps.png" />
        </button>
      </Link>

      <Link to="/Poker">
        <button>
          <p>Poker</p>
          <img src="/images/Poker.png" />
        </button>
      </Link>

      <Link to="/Race">
        <button>
          <p>Race</p>
          <img src="/images/Race.png" />
        </button>
      </Link>

      <Link to="/Roulette">
        <button>
          <p>Roulette</p>
          <img src="/images/Roulette.png" />
        </button>
      </Link>

      <Link to="/Slots">
        <button>
          <p>Slots</p>
          <img src="/images/Slots.png" />
        </button>
      </Link>
    </div>
  );
}
