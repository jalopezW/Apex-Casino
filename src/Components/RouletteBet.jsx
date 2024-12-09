import { useEffect, useState } from "react";
import "./Roulette.css";

export default function RouletteBet({ betList, setBetList, score }) {
  const [currentBet, setCurrentBet] = useState("");
  const [betValue, setBetValue] = useState(0);

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

  function clearEntry() {
    var tempBetList = betList;

    delete tempBetList[currentBet];

    setBetList(tempBetList);
  }

  useEffect(() => {
    setBetValue(betList[currentBet] ? betList[currentBet] : 0);
  }, [betList, currentBet]);

  return (
    <div id="roulette-bet">
      <div className="table">
        <div className="top">
          <div className="zeros">
            <button onClick={() => setCurrentBet("0")} id="green">
              0
            </button>
            <button onClick={() => setCurrentBet("00")} id="green">
              00
            </button>
          </div>

          <div className="middle">
            <button onClick={() => setCurrentBet("1")} id="red">
              1
            </button>
            <button onClick={() => setCurrentBet("2")}>2</button>
            <button onClick={() => setCurrentBet("3")} id="red">
              3
            </button>
            <button onClick={() => setCurrentBet("4")}>4</button>
            <button onClick={() => setCurrentBet("5")} id="red">
              5
            </button>
            <button onClick={() => setCurrentBet("6")}>6</button>
            <button onClick={() => setCurrentBet("7")} id="red">
              7
            </button>
            <button onClick={() => setCurrentBet("8")}>8</button>
            <button onClick={() => setCurrentBet("9")} id="red">
              9
            </button>
            <button onClick={() => setCurrentBet("10")}>10</button>
            <button onClick={() => setCurrentBet("11")}>11</button>
            <button onClick={() => setCurrentBet("12")} id="red">
              12
            </button>
            <button onClick={() => setCurrentBet("13")}>13</button>
            <button onClick={() => setCurrentBet("14")} id="red">
              14
            </button>
            <button onClick={() => setCurrentBet("15")}>15</button>
            <button onClick={() => setCurrentBet("16")} id="red">
              16
            </button>
            <button onClick={() => setCurrentBet("17")}>17</button>
            <button onClick={() => setCurrentBet("18")} id="red">
              18
            </button>
            <button onClick={() => setCurrentBet("19")} id="red">
              19
            </button>
            <button onClick={() => setCurrentBet("20")}>20</button>
            <button onClick={() => setCurrentBet("21")} id="red">
              21
            </button>
            <button onClick={() => setCurrentBet("22")}>22</button>
            <button onClick={() => setCurrentBet("23")} id="red">
              23
            </button>
            <button onClick={() => setCurrentBet("24")}>24</button>
            <button onClick={() => setCurrentBet("25")} id="red">
              25
            </button>
            <button onClick={() => setCurrentBet("26")}>26</button>
            <button onClick={() => setCurrentBet("27")} id="red">
              27
            </button>
            <button onClick={() => setCurrentBet("28")}>28</button>
            <button onClick={() => setCurrentBet("29")}>29</button>
            <button onClick={() => setCurrentBet("30")} id="red">
              30
            </button>
            <button onClick={() => setCurrentBet("31")}>31</button>
            <button onClick={() => setCurrentBet("32")} id="red">
              32
            </button>
            <button onClick={() => setCurrentBet("33")}>33</button>
            <button onClick={() => setCurrentBet("34")} id="red">
              34
            </button>
            <button onClick={() => setCurrentBet("35")}>35</button>
            <button onClick={() => setCurrentBet("36")} id="red">
              36
            </button>
            <button onClick={() => setCurrentBet("1st col")}>2 - 1</button>
            <button onClick={() => setCurrentBet("2nd col")}>2 - 1</button>
            <button onClick={() => setCurrentBet("3rd col")}>2 - 1</button>
          </div>
        </div>

        <div className="top_bottom">
          <button onClick={() => setCurrentBet("1st 12")}>1st 12</button>
          <button onClick={() => setCurrentBet("2nd 12")}>2nd 12</button>
          <button onClick={() => setCurrentBet("3rd 12")}>3rd 12</button>
        </div>

        <div className="bottom_bottom">
          <button onClick={() => setCurrentBet("1 - 18")}>1 - 18</button>
          <button onClick={() => setCurrentBet("Even")}>Even</button>
          <button onClick={() => setCurrentBet("Red")} id="red">
            Red
          </button>
          <button onClick={() => setCurrentBet("Black")}>Black</button>
          <button onClick={() => setCurrentBet("Odd")}>Odd</button>
          <button onClick={() => setCurrentBet("19 - 36")}>19 - 36</button>
        </div>
      </div>

      {currentBet && (
        <div id="better">
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
              Bet on {currentBet}: ${betValue.toLocaleString()}
            </p>
            <button onClick={() => clearEntry()}>Clear</button>
            <button onClick={() => setBetList({})}>Clear All</button>
          </div>
        </div>
      )}
    </div>
  );
}
