import { useEffect, useState } from "react";
import { getDeck, getCard } from "../Services/cardService";
import GameHeader from "./GameHeader";
import PokerTable from "./PokerTable";
import CardBetPlacer from "./CardBetPlacer";
import PokerResults from "./PokerResults";
import "./Poker.css";

export default function Poker({ score, updateScore, user }) {
  const [betting, setBetting] = useState(false);
  const [round, setRound] = useState(0);
  const [bet, setBet] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [win, setWin] = useState(false);

  async function bettingFlag() {
    round == 0 && (await startGame());
    setRound(round + 1);
    setBetting(false);
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
    setPlayerCards(pCards);
    setBotCards(dCards);
    setCommunityCards(cCards);
  }

  function calculate_hands(playerhand, communitycards) {
    const community = communitycards.map((card) => card.code);
    const player = playerhand.map((card) => card.code);
    const total = [...community, ...player];
    const spades = total
      .map((code) => (code[1] == "S" ? cardScore(code[0]) : null))
      .filter((element) => element != null)
      .sort((a, b) => b - a);
    const diamonds = total
      .map((code) => (code[1] == "D" ? cardScore(code[0]) : null))
      .filter((element) => element != null)
      .sort((a, b) => b - a);
    const hearts = total
      .map((code) => (code[1] == "H" ? cardScore(code[0]) : null))
      .filter((element) => element != null)
      .sort((a, b) => b - a);
    const clubs = total
      .map((code) => (code[1] == "C" ? cardScore(code[0]) : null))
      .filter((element) => element != null)
      .sort((a, b) => b - a);
    const suits = total.map((code) => code[1]);
    const cardNum = total.map((code) => cardScore(code[0]));
    const suitsFreq = frequency(suits);
    const cardNumFreq = frequency(cardNum);
    const freqOfFreq = Object.values(cardNumFreq);
    var sortedCardNum = [...new Set(cardNum)];
    sortedCardNum.sort((a, b) => b - a);

    var winner = 0;

    checkRoyalFlush(spades, diamonds, hearts, clubs)
      ? (winner = 10)
      : checkStraightFlush(spades, diamonds, hearts, clubs)
      ? (winner = 9)
      : freqOfFreq.includes(4)
      ? (winner = 8)
      : freqOfFreq.includes(3) && freqOfFreq.includes(2)
      ? (winner = 7)
      : Object.values(suitsFreq).includes(5)
      ? (winner = 6)
      : checkStraight(sortedCardNum)
      ? (winner = 5)
      : freqOfFreq.includes(3)
      ? (winner = 4)
      : frequency(freqOfFreq)[2] >= 2
      ? (winner = 3)
      : freqOfFreq.includes(2)
      ? (winner = 2)
      : (winner = 1);
    return winner;
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
      : card == "0"
      ? 10
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

  function checkStraightFlush(spades, diamonds, hearts, clubs) {
    return checkStraight(spades) ||
      checkStraight(diamonds) ||
      checkStraight(hearts) ||
      checkStraight(clubs)
      ? true
      : false;
  }

  function checkRoyalFlush(spades, diamonds, hearts, clubs) {
    const rFlush = [14, 13, 12, 11, 10];

    return JSON.stringify(spades.slice(0, 5)) === JSON.stringify(rFlush) ||
      JSON.stringify(diamonds.slice(0, 5)) === JSON.stringify(rFlush) ||
      JSON.stringify(hearts.slice(0, 5)) === JSON.stringify(rFlush) ||
      JSON.stringify(clubs.slice(0, 5)) === JSON.stringify(rFlush)
      ? true
      : false;
  }

  function endGame(fold) {
    setRound(6);
    var state = null;
    calculate_hands(playerCards, communityCards) <
    calculate_hands(botCards, communityCards)
      ? (state = false)
      : (state = true);

    fold && (state = false);

    state ? updateScore(bet) : updateScore(bet * -1);
    setWin(state);
  }

  function reset() {
    setBetting(false);
    setRound(0);
    setBet(0);
    setCurrentDeck("");
    setPlayerCards([]);
    setBotCards([]);
    setCommunityCards([]);
    setWin(false);
  }

  useEffect(() => {
    5 > round && round > 3 && endGame(false);
  }, [round]);

  return (
    <>
      <GameHeader title="💰 Poker 💰" score={score} />
      <div id="poker-body">
        <PokerTable
          round={round}
          botCards={botCards}
          communityCards={communityCards}
          playerCards={playerCards}
          betting={betting}
          endGame={endGame}
          setRound={setRound}
          setBetting={setBetting}
          bet={bet}
        />
        {(round == 0 || betting) && user && (
          <CardBetPlacer
            bet={(newBet) =>
              setBet(bet + newBet >= score ? score : bet + newBet)
            }
            flag={bettingFlag}
            score={score}
          />
        )}
        {round > 3 && <PokerResults win={win} bet={bet} reset={reset} />}
      </div>
    </>
  );
}
