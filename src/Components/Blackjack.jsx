import { useEffect, useState } from "react";
import { getDeck, getCard } from "../Services/cardService";
import GameHeader from "./GameHeader";
import BlackjackTable from "./BlackjackTable";
import BlackjackResults from "./BlackjackResults";
import BlackjackBet from "./BlackjackBet";
import "./Blackjack.css";

export default function Blackjack({ score, updateScore, user }) {
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

  async function addCard(whom) {
    whom === "player"
      ? await getCard(currentDeck).then((card) =>
          setPlayerCards([...playerCards, ...card])
        )
      : await getCard(currentDeck).then((card) =>
          setDealerCards([...dealerCards, ...card])
        );
  }

  function dealerTurn() {
    setDrawing(false);
    if (dealerScore < 17) {
      addCard("dealer");
    } else {
      endGame();
    }
  }

  function endGame() {
    setDrawing(false);
    (playerScore > dealerScore && playerScore <= 21) || dealerScore > 21
      ? (setWin(true), updateScore(bet))
      : (playerScore < dealerScore && dealerScore <= 21) || playerScore > 21
      ? (setLose(true), updateScore(bet * -1))
      : setTie(true);
  }

  function getCardScore(card) {
    const value = card.value;
    return value == "ACE"
      ? 11
      : value === "JACK" || value === "QUEEN" || value === "KING"
      ? 10
      : Number(value);
  }

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

  useEffect(() => {
    setPlayerScore(getScore(playerCards));
  }, [playerCards]);
  useEffect(() => {
    setDealerScore(getScore(dealerCards));
  }, [dealerCards]);
  useEffect(() => {
    playerScore > 21 ? endGame() : null;
  }, [playerScore]);
  useEffect(() => {
    dealerScore >= 17 && !drawing ? endGame() : !drawing && addCard("dealer");
  }, [dealerScore]);

  return (
    <div id="blackjack-game-container">
      <GameHeader title="🃏 Blackjack 🃏" score={score} />
      <BlackjackTable
        betting={betting}
        drawing={drawing}
        dealerCards={dealerCards}
        playerCards={playerCards}
        addCard={addCard}
        dealerTurn={dealerTurn}
      />
      {!betting && (
        <BlackjackResults
          drawing={drawing}
          lose={lose}
          win={win}
          tie={tie}
          reset={reset}
          dealerScore={dealerScore}
          playerScore={playerScore}
        />
      )}
      {user && (
        <BlackjackBet
          betting={betting}
          lose={lose}
          win={win}
          tie={tie}
          bet={bet}
          setBet={setBet}
          bettingFlag={bettingFlag}
          score={score}
        />
      )}
    </div>
  );
}
