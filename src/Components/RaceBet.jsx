import { useEffect, useState } from "react";

export default function RaceBet({ betList, setBetList, score }) {
  const [currentBet, setCurrentBet] = useState("");
  const [betValue, setBetValue] = useState(0);
  const [picked, setPicked] = useState(false);

  function updateBet(toAdd) {
    var tempBetList = betList;
    const totalBet = Object.values(tempBetList).reduce((a, b) => a + b, 0);
    totalBet + toAdd >= score
      ? currentBet in betList
        ? (tempBetList[currentBet] = score - totalBet + tempBetList[currentBet])
        : (tempBetList[currentBet] = score)
      : currentBet in betList
      ? (tempBetList[currentBet] = tempBetList[currentBet] + toAdd)
      : (tempBetList[currentBet] = toAdd);
    setBetList(tempBetList);
    setBetValue(betList[currentBet]);
  }

  useEffect(() => {
    currentBet && setPicked(true);
    setBetValue(betList[currentBet] ? betList[currentBet] : 0);
    setBetList({});
  }, [currentBet]);

  return (
    <div className="betting-section">
      <div id="colors">
        <button
          id={picked ? (currentBet == "Red" ? "red" : "disabled ") : "red"}
          onClick={() => setCurrentBet("Red")}
        >
          Red Rocket
        </button>
        <button
          id={picked ? (currentBet == "Blue" ? "blue" : "disabled ") : "blue"}
          onClick={() => setCurrentBet("Blue")}
        >
          Blue Lightning
        </button>
        <button
          id={
            picked ? (currentBet == "Green" ? "green" : "disabled ") : "green"
          }
          onClick={() => setCurrentBet("Green")}
        >
          Green Bean
        </button>
      </div>
      {currentBet && (
        <div id="bet">
          <img onClick={() => updateBet(1)} src={"/images/White.png"} />

          <img onClick={() => updateBet(5)} src={"/images/Red.png"} />

          <img onClick={() => updateBet(25)} src={"/images/Green.png"} />

          <img onClick={() => updateBet(100)} src={"/images/Black.png"} />

          <img onClick={() => updateBet(500)} src={"/images/Purple.png"} />

          <img onClick={() => updateBet(1000)} src={"/images/Orange.png"} />

          <p> $1 </p>
          <p> $5 </p>
          <p> $25 </p>
          <p> $100 </p>
          <p> $500 </p>
          <p> $1,000 </p>

          <div id="bet-output">
            Bet on {currentBet}: ${betValue.toLocaleString()}
            <button
              onClick={() => {
                setBetList({}), setBetValue(0);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
