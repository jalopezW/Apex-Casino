import GameHeader from "./GameHeader";
import { useEffect, useState } from "react";
import { getDeck, getCard } from "../Services/cardService";
import BetPlacer from "./PokerBetPlacer.jsx";

export default function Poker() {
    const [betting, setBetting] = useState(true);
    const [bet, setBet] = useState(0);
    const [currentDeck, setCurrentDeck] = useState("");
    const [playerCards, setPlayerCards] = useState([]);
    const [botCards, setBotCards] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [botScores, setBotScores] = useState([]);
    const [lose, setLose] = useState(false);
    const [win, setWin] = useState(false);
    const [tie, setTie] = useState(false);

    async function bettingFlag() {
        setBetting(false);
        await startGame();
        setDrawing(true);
    }

    async function startGame() {
        let deck = "";
        let pCards = [];
        let bCards = [];

        await getDeck().then((id) => (deck = id));
        await getCard(deck).then((card) => (pCards = [...pCards, ...card]));
        await getCard(deck).then((card) => (pCards = [...pCards, ...card]));

        for (let i = 0; i < 3; i++) {
            let botHand = [];
            await getCard(deck).then((card) => (botHand = [...botHand, ...card]));
            await getCard(deck).then((card) => (botHand = [...botHand, ...card]));
            bCards.push(botHand);
        }

        setCurrentDeck(deck);
        setPlayerCards(pCards);
        setBotCards(bCards);
    }

    function calculateScore(hand) {
        const values = {
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            JACK: 11,
            QUEEN: 12,
            KING: 13,
            ACE: 14,
        };

        return hand.reduce((total, card) => total + values[card.value], 0);
    }

    function endGame() {
        const playerTotal = calculateScore(playerCards);
        const botTotals = botCards.map((hand) => calculateScore(hand));

        setPlayerScore(playerTotal);
        setBotScores(botTotals);

        const maxBotScore = Math.max(...botTotals);

        if (playerTotal > maxBotScore) {
            setWin(true);
        } else if (playerTotal === maxBotScore) {
            setTie(true);
        } else {
            setLose(true);
        }

        setDrawing(false);
    }

    return (
        <>
            <GameHeader title="Poker" />
            {betting ? (
                <BetPlacer bet={setBet} flag={() => bettingFlag()} />
            ) : (
                <>
                    {drawing ? (
                        <>
                            <div id="playerCards">
                                <h3>Player's Hand:</h3>
                                {playerCards.map((card) => (
                                    <img key={card.code} src={card.image} alt={card.code} />
                                ))}
                            </div>
                            <div id="botCards">
                                {botCards.map((hand, index) => (
                                    <div key={index}>
                                        <h3>Bot {index + 1}:</h3>
                                        {hand.map((card) => (
                                            <img key={card.code} src={card.image} alt={card.code} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <button onClick={endGame}>Reveal Results</button>
                        </>
                    ) : (
                        <div id="results">
                            <h3>Final Results:</h3>
                            <p>Player's Score: {playerScore}</p>
                            {botScores.map((score, index) => (
                                <p key={index}>Bot {index + 1} Score: {score}</p>
                            ))}
                            {win && <p>You Win!</p>}
                            {lose && <p>You Lose!</p>}
                            {tie && <p>It's a Tie!</p>}
                            <button onClick={() => window.location.reload()}>Play Again</button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
