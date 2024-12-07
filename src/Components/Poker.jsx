import GameHeader from "./GameHeader";
import { useEffect, useState } from "react";
import { getDeck, getCard } from "../Services/cardService";
import BetPlacer from "./BetPlacer.jsx";

export default function Poker({ score }) {
  const [betting, setBetting] = useState(true);
  const [bet, setBet] = useState(0);
  const [currentDeck, setCurrentDeck] = useState("");
  const [playerCards, setPlayerCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
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
    var deck = "";
    var pCards = [];
    var dCards = [];
    var cCards = [];
    await getDeck().then((id) => (deck = id));
    await getCard(deck).then((card) => (pCards = [...pCards, ...card]));
    await getCard(deck).then((card) => (pCards = [...pCards, ...card]));
    await getCard(deck).then((card) => (dCards = [...dCards, ...card]));
    await getCard(deck).then((card) => (dCards = [...dCards, ...card]));
    await getCard(deck).then((card) => (cCards = [...cCards, ...card]));
    await getCard(deck).then((card) => (cCards = [...cCards, ...card]));
    await getCard(deck).then((card) => (cCards = [...cCards, ...card]));
    await getCard(deck).then((card) => (cCards = [...cCards, ...card]));
    await getCard(deck).then((card) => (cCards = [...cCards, ...card]));
    setCurrentDeck(deck);
    setPlayerCards(pCards);
    setBotCards(dCards);
    setCommunityCards(cCards);
  }

  function calculate_hands(playerhand, communitycards) {
    bettingFlag();
    const community = communitycards.map((card) => card.code);
    const player = playerhand.map((card) => card.code);
    const total = [...community, ...player];
    const suits = total.map((code) => code[1]);
    const cardNum = total.map((code) => cardScore(code[0]));
    const suitsFreq = frequency(suits);
    const cardNumFreq = frequency(cardNum);
    const freqOfFreq = Object.values(cardNumFreq);
    var sortedCardNum = [...new Set(cardNum)];
    sortedCardNum.sort((a, b) => b - a);

    var winner = "";

    freqOfFreq.includes(4)
      ? console.log("4 of kind")
      : freqOfFreq.includes(3) && freqOfFreq.includes(2)
      ? console.log("full house")
      : Object.values(suitsFreq).includes(5)
      ? console.log("flush")
      : checkStraight(sortedCardNum)
      ? console.log("straight")
      : freqOfFreq.includes(3)
      ? console.log("3 of kind")
      : frequency(freqOfFreq)[2] == 2
      ? console.log("2 pair")
      : freqOfFreq.includes(2)
      ? console.log("2 of kind")
      : console.log("high card");
  }

  function frequency(list) {
    const frequency = {};

    for (const num of list) {
      frequency[num] = (frequency[num] || 0) + 1;
    }

    return frequency;
  }

  function cardScore(card) {
    return card == "A"
      ? 14
      : card == "K"
      ? 13
      : card == "Q"
      ? 12
      : card == "J"
      ? 11
      : Number(card);
  }

  function checkStraight(sortedNums) {
    if (sortedNums.length < 5) {
      return false;
    } else {
      for (let i = 0; i + 5 <= sortedNums.length; i++) {
        for (let j = 0; j < 4; j++) {
          if (!(sortedNums[i + j + 1] == sortedNums[i + j] - 1)) {
            break;
          } else if (j == 3) {
            return true;
          }
        }
      }
      return false;
    }
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
      <GameHeader title="Poker" score={score} />

      <div id="table">
        {drawing ? (
          <div>
            <img
              src="https://deckofcardsapi.com/static/img/back.png"
              alt="Face down card"
            />
            <img
              src="https://deckofcardsapi.com/static/img/back.png"
              alt="Face down card"
            />
            {playerCards.map((card) => (
              <img key={card.code} src={card.image} alt={card.value} />
            ))}
            {communityCards.map((card) => (
              <img key={card.code} src={card.image} alt={card.value} />
            ))}
            <button
              onClick={() => calculate_hands(playerCards, communityCards)}
            >
              calc
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

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
  );
}
