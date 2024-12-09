import GameHeader from "./GameHeader";
import { useEffect, useState } from "react";
import CrapsBet from "./CrapsBet";
import "./Craps.css";

export default function Craps({ score, updateScore, user }) {
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
    setDice1(0);
    setDice2(0);
    await sleep(2000);
    setDice1(Math.floor(Math.random() * 6 + 1));
    setDice2(Math.floor(Math.random() * 6 + 1));
    setRolling(false);
  }

  function updateBet(newBet) {
    setBetList(newBet);
    setWrittenBet(
      Object.keys(newBet).map(
        (key) => `${key} = $${newBet[key].toLocaleString()} `
      )
    );
  }

  async function calculateScore() {
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
    setBetList({});
  }

  useEffect(() => {
    setResult(dice1 + dice2);
  }, [dice2]);

  useEffect(() => {
    result != 0 && calculateScore();
  }, [result]);

  return (
    <>
      <GameHeader title="🎲 Craps 🎲" score={score} />
      <div id="everything">
        <div id="left">
          <div id="dice">
            <img
              src={
                rolling ? "/images/rolling.gif" : `/images/craps_${dice1}.png`
              }
              width={"200px"}
              height={"200px"}
            />
            <img
              src={
                rolling ? "/images/rolling.gif" : `/images/craps_${dice2}.png`
              }
              width={"200px"}
              height={"200px"}
            />
          </div>
          <div id="info-area">
            {Object.keys(betList).length > 0 && (
              <>
                {!rolling && <button onClick={roll}>Roll!</button>}
                <p>Current Placed Bet: {writtenBet}</p>
              </>
            )}
            {!rolling && totalWinnings != 0 && (
              <>
                <p>Last Roll: {result}</p>

                <p>
                  {totalWinnings > 0 ? "You won" : "You lost"}: $
                  {Math.abs(totalWinnings).toLocaleString()}
                </p>
              </>
            )}
          </div>
        </div>
        <div id="right">
          {user &&
            (rolling ? (
              <></>
            ) : (
              <CrapsBet
                betList={betList}
                setBetList={updateBet}
                score={score}
                id="craps-bet"
              />
            ))}
        </div>
      </div>
    </>
  );
}
