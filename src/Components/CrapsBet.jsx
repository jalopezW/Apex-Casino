import { useEffect, useState } from "react";

export default function CrapsBet({ betList, setBetList, score }) {
  const [currentBet, setCurrentBet] = useState("");
  const [betValue, setBetValue] = useState(0);
  const [picked, setPicked] = useState(false);

  function updateBet(toAdd) {
    var tempBetList = betList;
    const totalBet = Object.values(tempBetList).reduce((a, b) => a + b, 0);
    totalBet + toAdd >= score
      ? currentBet in betList
        ? (tempBetList[currentBet] = score - totalBet + tempBetList[currentBet])
        : setBetValue(0)
      : currentBet in betList
      ? (tempBetList[currentBet] = tempBetList[currentBet] + toAdd)
      : (tempBetList[currentBet] = toAdd);
    setBetList(tempBetList);
    setBetValue(betList[currentBet]);
  }

  useEffect(() => {
    currentBet &&
      (setPicked(true),
      setBetValue(betList[currentBet] ? betList[currentBet] : 0),
      setBetList({}));
  }, [currentBet]);

  return (
    <div id="craps-bet">
      <div id="buttons">
        <button
          onClick={() => setCurrentBet(7)}
          className="full"
          id={
            picked ? (currentBet == 7 ? "selected" : "disabled ") : "selected"
          }
        >
          <p>5 to 1 </p>
          <p className="red">Seven </p>
          <p>5 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet(6)}
          className="half"
          id={
            picked ? (currentBet == 6 ? "selected" : "disabled ") : "selected"
          }
        >
          <div id="button-images">
            <img src="/images/craps_3.png" width="25px" height="25px" />
            <img src="/images/craps_3.png" width="25px" height="25px" />
          </div>
          <p>10 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet(10)}
          className="half"
          id={
            picked ? (currentBet == 10 ? "selected" : "disabled ") : "selected"
          }
        >
          <div id="button-images">
            <img src="/images/craps_5.png" width="25px" height="25px" />
            <img src="/images/craps_5.png" width="25px" height="25px" />
          </div>
          <p>8 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet(8)}
          className="half"
          id={
            picked ? (currentBet == 8 ? "selected" : "disabled ") : "selected"
          }
        >
          <div id="button-images">
            <img src="/images/craps_4.png" width="25px" height="25px" />
            <img src="/images/craps_4.png" width="25px" height="25px" />
          </div>
          <p>10 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet(4)}
          className="half"
          id={
            picked ? (currentBet == 4 ? "selected" : "disabled ") : "selected"
          }
        >
          <div id="button-images">
            <img src="/images/craps_2.png" width="25px" height="25px" />
            <img src="/images/craps_2.png" width="25px" height="25px" />
          </div>
          <p>8 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet(3)}
          className="third"
          id={
            picked ? (currentBet == 3 ? "selected" : "disabled ") : "selected"
          }
        >
          <div id="button-images">
            <img src="/images/craps_2.png" width="25px" height="25px" />
            <img src="/images/craps_1.png" width="25px" height="25px" />
          </div>
          <p>16 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet(2)}
          className="third"
          id={
            picked ? (currentBet == 2 ? "selected" : "disabled ") : "selected"
          }
        >
          <div id="button-images">
            <img src="/images/craps_1.png" width="25px" height="25px" />
            <img src="/images/craps_1.png" width="25px" height="25px" />
          </div>
          <p>31 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet(12)}
          className="third"
          id={
            picked ? (currentBet == 12 ? "selected" : "disabled ") : "selected"
          }
        >
          <div id="button-images">
            <img src="/images/craps_6.png" width="25px" height="25px" />
            <img src="/images/craps_6.png" width="25px" height="25px" />
          </div>
          <p>31 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet(11)}
          className="half"
          id={
            picked ? (currentBet == 11 ? "selected" : "disabled ") : "selected"
          }
        >
          <div id="button-images">
            <img src="/images/craps_6.png" width="25px" height="25px" />
            <img src="/images/craps_5.png" width="25px" height="25px" />
          </div>
          <p>16 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet(11)}
          className="half"
          id={
            picked ? (currentBet == 11 ? "selected" : "disabled ") : "selected"
          }
        >
          <div id="button-images">
            <img src="/images/craps_6.png" width="25px" height="25px" />
            <img src="/images/craps_5.png" width="25px" height="25px" />
          </div>
          <p>16 to 1</p>
        </button>
        <button
          onClick={() => setCurrentBet("Any")}
          className="full"
          id={
            picked
              ? currentBet == "Any"
                ? "selected"
                : "disabled "
              : "selected"
          }
        >
          <p>8 to 1 </p>
          <p className="red">Any Craps</p>
          <p>8 to 1</p>
        </button>
      </div>
      {currentBet && (
        <div id="bet-placer">
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
            <p> $1,000 </p>
          </div>

          <div id="bet-output">
            <p>
              Bet on {currentBet}: $
              {currentBet in betList ? betValue.toLocaleString() : 0}
            </p>
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
