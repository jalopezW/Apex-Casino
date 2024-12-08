import GameHeader from "./GameHeader";
import { useEffect, useState } from "react";
import CrapsBet from "./CrapsBet";

export default function Craps({ score, updateScore }) {
  const multipliers = [0, 0, 31, 16, 8, 0, 10, 5, 10, 0, 8, 16, 31];
  const [betList, setBetList] = useState({});
  const [writtenBet, setWrittenBet] = useState("");
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [result, setResult] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [rolling, setRolling] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function roll() {
    setResult(0);
    setRolling(true);
    await sleep(2000);
    setDice1(Math.floor(Math.random() * 6 + 1));
    setDice2(Math.floor(Math.random() * 6 + 1));
    setRolling(false);
  }

  function updateBet(newBet) {
    setBetList(newBet);
    setWrittenBet(
      Object.keys(newBet).map((key) => `${key} = $${newBet[key]} `)
    );
  }

  function calculateScore() {
    var total = 0;
    result in betList
      ? (total += betList[result] * multipliers[result])
      : "Any" in betList
      ? result == 2 || result == 3 || result == 12
        ? (total += betList["Any"] * 8)
        : null
      : null;
    total -=
      Object.values(betList).reduce((a, b) => a + b, 0) -
      (result in betList ? betList[result] : 0);
    setTotalWinnings(total);
    updateScore(total);
  }

  useEffect(() => {
    setResult(dice1 + dice2);
  }, [dice2]);

  useEffect(() => {
    calculateScore();
  }, [result]);

  return (
    <>
      <GameHeader title="Craps" score={score} />
      <div id="everything">
        <div id="dice">
          <img
            src={rolling ? "/images/rolling.gif" : `/images/craps_${dice1}.png`}
            width={"100px"}
            height={"100px"}
          />
          <img
            src={rolling ? "/images/rolling.gif" : `/images/craps_${dice2}.png`}
            width={"100px"}
            height={"100px"}
          />
        </div>
        <div id="info-area">
          {Object.keys(betList).length > 0 && (
            <button onClick={roll}>Roll!</button>
          )}
          <p>Placed Bets: {writtenBet}</p>
          <p>Dice Roll: {result}</p>
          <p>Win/Loss: ${totalWinnings}</p>
        </div>

        {rolling ? (
          <></>
        ) : (
          <CrapsBet betList={betList} setBetList={updateBet} />
        )}
      </div>
    </>
  );
}
