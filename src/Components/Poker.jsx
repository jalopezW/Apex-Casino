import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"
import BetPlacer from "./BetPlacer"

export default function Poker() {
    const [betting, setBetting] = useState(true)
    const [bet, setBet] = useState(0)
    const [currentDeck, setCurrentDeck] = useState("")
    const [playerCards, setPlayerCards] = useState([])
    const [dealerCards, setDealerCards] = useState([])
    const [drawing, setDrawing] = useState(false)
    const [playerScore, setPlayerScore] = useState(0)
    const [dealerScore, setDealerScore] = useState(0)
    const [lose, setLose] = useState(false)
    const [win, setWin] = useState(false)
    const [tie, setTie] = useState(false)

    const [botCards, setBotCards] = useState([])
    const [botScores, setBotScores] = useState(0)
    const [deckID, setDeckID] = ("")


    async function starterDeck() {
    }

    async function dealOutCards() {
        
        setPlayerCards();
        setBotCards();
        setBetting(false);
        setDrawing(true);
    }

    function scoringCalculator(hand) {
        const valuesInPriority = {
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            "JACK": 11,
            "QUEEN": 12,
            "KING": 13,
            "ACE": 14,};
// doesn't do anything yet
    }

    function gameOutcome() {
        const playerTotalScore = scoringCalculator(playerCards);
        const botsTotalScores = scoringCalculator(botCards);
        setPlayerScore(playerTotalScore);
        setBotScores(botsTotalScores);

        const largestBotScore = Math.max(...botsTotalScores);
        if (playerTotalScore > largestBotScore){
            setWin(true);

        } else if (playerTotalScore == largestBotScore) {
            setTie(true);
        } else {
            setLose(true);
        }
        setDrawing(false);
    }

    function bettingAmount(event) {
        const value = parseInt(event.target.value, 10);
        if (value >= 0) {
            setBet(value);

        }
    useEffect(() => {starterDeck(); })
    }

    return (
        <>
            <GameHeader title ="Poker" />
            {betting && (
                <div>
                    <h1>How Much Do You Want to Bet? </h1>
                    <input id="betInputField" type="number" placeholder="Enter Amount" onChange={bettingAmount}/>
                    <button onClick={dealOutCards} disabled={bet === 0 }>Deal Out Cards</button>
                </div>
                
            )}
            {drawing && (
                <div>
                    <h2>Player's Cards:</h2>

                    <button onClick={gameOutcome}>Finish Game Button Test</button>
                </div>
            )}

        </>
    );
}
