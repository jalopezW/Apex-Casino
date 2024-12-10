import GameHeader from "./GameHeader";
import { useEffect, useState } from "react";
import RaceBet from "./RaceBet";
import "./Race.css";
import RaceHorses from "./RaceHorses";
import RaceAction from "./RaceAction";

export default function Race({ score, updateScore, user }) {
  const horses = ["Red", "Blue", "Green"];
  const [isMoved, setIsMoved] = useState(false);
  const [winners, setWinners] = useState({});
  const [winner, setWinner] = useState("");
  const [betList, setBetList] = useState({});
  const [writtenBet, setWrittenBet] = useState("");
  const [over, setOver] = useState(false);

  function getWinner() {
    const result = {};
    const copy = [...horses];

    while (Object.keys(result).length < 3) {
      const randomIndex = Math.floor(Math.random() * copy.length);
      const chosenElement = copy.splice(randomIndex, 1)[0];
      if (Object.keys(result).length == 0) {
        setWinner(chosenElement);
      }
      result[chosenElement] = Object.keys(result).length + 1;
    }
    setOver(true);
    setIsMoved(!isMoved);
    setWinners(result);
  }

  function updateBet(newBet) {
    setBetList(newBet);
    setWrittenBet(
      Object.keys(newBet).map(
        (key) => `${key} = $${newBet[key].toLocaleString()} `
      )
    );
  }

  function placeToSeconds(place) {
    return over ? (place === 1 ? 1 : place === 2 ? 2 : 3) : 0;
  }

  function reset() {
    setOver(false);
    setIsMoved(!isMoved);
    setBetList({});
    setWrittenBet(0);
  }

  function endGame() {
    winner in betList
      ? updateScore(betList[winner])
      : updateScore(Object.values(betList)[0] * -1);
  }

  useEffect(() => {
    over && endGame();
  }, [over]);

  return (
    <div className="race">
      <GameHeader title="🐎 Race 🐎" score={score} />
      <RaceHorses
        winners={winners}
        placeToSeconds={placeToSeconds}
        isMoved={isMoved}
      />

      <RaceAction
        over={over}
        winner={winner}
        betList={betList}
        reset={reset}
        getWinner={getWinner}
      />

      {user && !over && (
        <RaceBet betList={betList} setBetList={updateBet} score={score} />
      )}
    </div>
  );
}
