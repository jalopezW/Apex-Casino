import GameHeader from "./GameHeader";
import { useEffect, useState } from "react";
import { getDeck, getCard } from "../Services/cardService";
import BetPlacer from "./BetPlacer";
import "./Blackjack.css";

export default function Blackjack({score, updateScore}) {
    const [betting, setBetting] = useState(true);
    const [bet, setBet] = useState(0);
    const [currentDeck, setCurrentDeck] = useState("");
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [lose, setLose] = useState(false);
    const [win, setWin] = useState(false);
    const [tie, setTie] = useState(false);

    async function bettingFlag() {
        await startBehavior();
        setBetting(false);
        setDrawing(true);
    }

    async function startBehavior() {
        let deck = "";
        let pCards = [];
        let dCards = [];
        await getDeck().then((id) => (deck = id));
        await getCard(deck).then((card) => (pCards = [...pCards, ...card]));
        await getCard(deck).then((card) => (pCards = [...pCards, ...card]));
        await getCard(deck).then((card) => (dCards = [...dCards, ...card]));
        await getCard(deck).then((card) => (dCards = [...dCards, ...card]));
        setCurrentDeck(deck);
        setPlayerCards(pCards);
        setDealerCards(dCards);
    }

    async function addCard(whom){
        whom === "player" ? (
            await getCard(currentDeck).then((card)=> setPlayerCards([...playerCards, ...card]))
        ) : (
            await getCard(currentDeck).then((card)=> setDealerCards([...dealerCards, ...card]))
        )
    }


    function dealerTurn() {
        setDrawing(false);
        if (dealerScore < 17) {
            addCard("dealer");
        } else {
            endGame();
        }
    }

    function endGame(){
        playerScore > dealerScore ? (
            setWin(true),
            updateScore(bet)
        ) : playerScore < dealerScore ? (
            setLose(true),
            updateScore(bet * -1)
        ) : (
            setTie(true)
        )
    }

    /* Chnaged Here */
    function getCardScore(card){
        const value = card.value
        if (value === "ACE"){
            return 11
        } else if (value === "JACK" || value === "QUEEN" || value === "KING") {
            return 10
        } else {
            return Number(value)
        }
    }
    /*Chnaged Here */

    function getScore(cards) {
        let preScore = cards.map(getCardScore).reduce((a, b) => a + b, 0);
        const aces = cards.filter((card) => card.value === "ACE").length;
        
        return preScore > 21 ? preScore - aces * 10 : preScore;
    }

    function reset() {
        setBetting(true);
        setBet(0);
        setCurrentDeck("");
        setPlayerCards([]);
        setDealerCards([]);
        setDrawing(false);
        setPlayerScore(0);
        setDealerScore(0);
        setLose(false);
        setWin(false);
        setTie(false);
    }


    useEffect (() => {setPlayerScore(getScore(playerCards))}, [playerCards]) 
    useEffect (() => {setDealerScore(getScore(dealerCards))}, [dealerCards])
    useEffect (() => {playerScore > 21 ? (setLose(true), setDrawing(false)) : (null)}, [playerScore])
    useEffect (() => {dealerScore > 21 ? (setWin(true)) : ( (!drawing && dealerScore < 17) ? (() => addCard("dealer")) : ((!drawing && 17 <= dealerScore <= 21) ? (endGame()): (null)))}, [dealerScore])


    // JSX
    // CHANGED
    return (
        <div id="blackjackGameContainer">
            <GameHeader title="Blackjack" score={score}/>
            <div id="gameContent">
                <div id="gameTable">
                    {!betting && (
                        <>
                            <div id="dealerCards">
                                {drawing ? (
                                    <>
                                        <img src={dealerCards[0]?.image} alt="Dealer card" />
                                        <img src="https://deckofcardsapi.com/static/img/back.png" alt="Face down card" />
                                    </>
                                ) : (
                                    dealerCards.map((card) => (
                                        <img key={card.code} src={card.image} alt={card.value} />
                                    ))
                                )}
                            </div>
                            <div id="playerCards">
                                {playerCards.map((card) => (
                                    <img key={card.code} src={card.image} alt={card.value} />
                                ))}
                            </div>
                            {drawing ? (
                                <div id="actionArea">
                                    <button onClick={() => addCard("player")}>Hit</button>
                                    <button onClick={() => dealerTurn()}>Stand</button>
                                </div>
                            ): (<></>)}
                        </>
                    )}
                </div>
                <div id="results">
                    {!betting && (
                        <div>
                            <p>{drawing ? "???" : dealerScore}</p>
                            <p>vs</p>
                            <p>{playerScore}</p>
                            {(lose || win || tie) && (
                                <button id="playAgainButton" onClick={() => reset()}>
                                    Play Again
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div id="bettingSection">
                {betting ? (
                    <BetPlacer bet={setBet} flag={bettingFlag} score ={score} />
                ) : lose ? (
                    <p>You Lost ${bet}</p>
                ) : win ? (
                    <p>You Win ${bet}</p>
                ) : tie ? (
                    <p>Push!</p>
                ) : (
                    <h2>Current Bet: ${bet}</h2>
                )}
            </div>
        </div>
    );
}