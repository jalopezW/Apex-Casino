import { Link } from "react-router-dom"

export default function Home() {

    return (
        <>
            <h1>Home</h1>
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
        </>
    )
    

}