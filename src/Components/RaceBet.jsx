import { useEffect, useState } from "react";

export default function RaceBet({ betList, setBetList }) {
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
      <div className="betting-section">
        <div id="zeros">
          <button id="red" onClick={() => setCurrrentBet("Red")}>
            Red Rocket
          </button>
          <button id="blue" onClick={() => setCurrrentBet("Blue")}>
            Blue Lightning
          </button>
          <button id="green" onClick={() => setCurrrentBet("Green")}>
            Green Bean
          </button>
        </div>

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

          <div> $1 </div>
          <div> $5 </div>
          <div> $25 </div>
          <div> $100 </div>
          <div> $500 </div>
          <div> $1000 </div>

          <div id="bet-on">
            Bet on {currentBet}: ${betValue}
            <button onClick={() => clearEntry()}>Clear</button>
            <button onClick={() => setBetList(new Map())}>Clear All</button>
          </div>
        </div>
      </div>
    </>
  );
}
