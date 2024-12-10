import { Link } from "react-router-dom";

export default function HomeButtons() {
  return (
    <div className="home-buttons">
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
  );
}
