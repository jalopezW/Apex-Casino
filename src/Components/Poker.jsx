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
        //const deck = await getDeck()
        //setCurrentDeck(await getDeck())
        var deck = ""
        var pCards = []
        var dCards= []
        await getDeck().then((id) => deck = id)
        await getCard(deck).then((card)=> pCards = [...pCards, ...card])
        await getCard(deck).then((card)=> pCards = [...pCards, ...card])
        await getCard(deck).then((card)=> dCards = [...dCards, ...card])
        await getCard(deck).then((card)=> dCards = [...dCards, ...card])
        //console.log(currentDeck)
        //addCard("player")
        //setPlayerCards([await getCard(currentDeck), await getCard(currentDeck)])
        //setDealerCards([await getCard(currentDeck), await getCard(currentDeck)])
        //console.log(playerCards)
        //console.log(dealerCards)
        setCurrentDeck(deck)
        setPlayerCards(pCards)
        setDealerCards(dCards)
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
            "JACK": 11,
            "QUEEN": 12,
            "KING": 13,
            "ACE": 14,
        };

    }

    function endGame() {
        const playerTotal = calculateScore(playerCards);
        const botTotals = "nothing for now :)";

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
                        <div id="results">
                            <p>Player's Score: {playerScore}</p>

                            {win && <p>You Win!</p>}
                            {lose && <p>You Lose!</p>}
                            {tie && <p>It's a Tie!</p>}
                            <button onClick={() => window.location.reload()}>Play Again</button>
                        </div>
                    )}
                </>
            )};
    


