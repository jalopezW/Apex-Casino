import { useEffect, useState } from "react";

export default function CrapsBet({ betList, setBetList }) {
  const [currentBet, setCurrrentBet] = useState("");
  const [betValue, setBetValue] = useState(0);

  function updateBet(toAdd) {
    var tempBetList = betList;
    currentBet in betList
      ? (tempBetList[currentBet] = tempBetList[currentBet] + toAdd)
      : (tempBetList[currentBet] = toAdd);
    setBetList(tempBetList);
    setBetValue(betList[currentBet]);
  }

  function clearEntry() {
    var tempBetList = betList;

    delete tempBetList.currentBet;

    setBetList(tempBetList);
  }

  useEffect(() => {
    setBetValue(betList[currentBet] ? betList[currentBet] : 0);
  }, [currentBet]);

  return (
    <>
      <button onClick={() => setCurrrentBet(7)}>5 to 1 Seven 5 to 1</button>
      <button onClick={() => setCurrrentBet(6)}>10 to 1 6</button>
      <button onClick={() => setCurrrentBet(10)}>8 to 1 10</button>
      <button onClick={() => setCurrrentBet(8)}>10 to 1 8</button>
      <button onClick={() => setCurrrentBet(4)}>8 to 1 4</button>
      <button onClick={() => setCurrrentBet(3)}>16 to 1 3</button>
      <button onClick={() => setCurrrentBet(2)}>31 to 1 2</button>
      <button onClick={() => setCurrrentBet(12)}>31 to 1 12</button>
      <button onClick={() => setCurrrentBet(11)}>16 to 1 11</button>
      <button onClick={() => setCurrrentBet(11)}>16 to 1 11</button>
      <button onClick={() => setCurrrentBet("Any")}>
        8 to 1 Any Craps 8 to 1
      </button>
      {currentBet ? (
        <footer>
          <div id="bet">
            <img
              onClick={() => updateBet(1)}
              src={"/images/White.png"}
              width={100}
              height={100}
            />

            <img
              onClick={() => updateBet(5)}
              src={"/images/Red.png"}
              width={100}
              height={100}
            />

            <img
              onClick={() => updateBet(25)}
              src={"/images/Green.png"}
              width={100}
              height={100}
            />

            <img
              onClick={() => updateBet(100)}
              src={"/images/Black.png"}
              width={100}
              height={100}
            />

            <img
              onClick={() => updateBet(500)}
              src={"/images/Purple.png"}
              width={100}
              height={100}
            />

            <img
              onClick={() => updateBet(1000)}
              src={"/images/Orange.png"}
              width={100}
              height={100}
            />

            <p> $1 </p>
            <p> $5 </p>
            <p> $25 </p>
            <p> $100 </p>
            <p> $500 </p>
            <p> $1000 </p>
          </div>

          <div id="betOutput">
            <p>
              Bet on {currentBet}: $ {currentBet in betList ? betValue : 0}
            </p>
            <button onClick={() => clearEntry()}>Clear</button>
            <button onClick={() => setBetList({})}>Clear All</button>
          </div>
        </footer>
      ) : (
        <></>
      )}
    </>
  );
}
