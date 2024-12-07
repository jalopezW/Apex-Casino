import { useEffect, useState } from "react";

export default function CrapsBet({ betList, setBetList }) {
  const [currentBet, setCurrrentBet] = useState("");
  const [betValue, setBetValue] = useState(0);

  function updateBet(toAdd) {
    var tempBetList = betList;

    betList.has(currentBet)
      ? tempBetList.set(currentBet, betList.get(currentBet) + toAdd)
      : tempBetList.set(currentBet, toAdd);
    setBetList(tempBetList);
  }

  function clearEntry() {
    var tempBetList = betList;

    tempBetList.delete(currentBet);

    setBetList(tempBetList);
  }

  useEffect(() => {
    setBetValue(betList.get(currentBet));
  }, [betList, currentBet]);

  return (
    <>
      <button onClick={() => setCurrrentBet("Pass Line")}>Pass Line</button>
      <button onClick={() => setCurrrentBet("Don't Pass Bar")}>
        Don't Pass Bar
      </button>
      <button onClick={() => setCurrrentBet("Big")}>Big</button>
      <button onClick={() => setCurrrentBet("Don't Pass Bar")}>
        Don't Pass Bar
      </button>
      <button onClick={() => setCurrrentBet("Field")}>Field</button>
      <button onClick={() => setCurrrentBet("Come")}>Come</button>
      <button onClick={() => setCurrrentBet("Don't Come Bar")}>
        Don't Come Bar
      </button>
      <button onClick={() => setCurrrentBet("4")}>4</button>
      <button onClick={() => setCurrrentBet("5")}>5</button>
      <button onClick={() => setCurrrentBet("6")}>6</button>
      <button onClick={() => setCurrrentBet("8")}>8</button>
      <button onClick={() => setCurrrentBet("9")}>9</button>
      <button onClick={() => setCurrrentBet("10")}>10</button>
      <button onClick={() => setCurrrentBet("11")}>11</button>
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
            Bet on {currentBet}: ${betValue}
          </p>
          <button onClick={() => clearEntry()}>Clear</button>
          <button onClick={() => setBetList(new Map())}>Clear All</button>
        </div>
      </footer>
    </>
  );
}
