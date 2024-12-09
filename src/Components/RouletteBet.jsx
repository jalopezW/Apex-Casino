import { useEffect, useState } from "react";
import "./Roulette.css";

export default function RouletteBet({ betList, setBetList }) {
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

    // fix

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
            <button onClick={() => setCurrrentBet("0")} id="green">
              0
            </button>
            <button onClick={() => setCurrrentBet("00")} id="green">
              00
            </button>
          </div>

          <div className="middle">
            <button onClick={() => setCurrrentBet("1")} id="red">
              1
            </button>
            <button onClick={() => setCurrrentBet("2")}>2</button>
            <button onClick={() => setCurrrentBet("3")} id="red">
              3
            </button>
            <button onClick={() => setCurrrentBet("4")}>4</button>
            <button onClick={() => setCurrrentBet("5")} id="red">
              5
            </button>
            <button onClick={() => setCurrrentBet("6")}>6</button>
            <button onClick={() => setCurrrentBet("7")} id="red">
              7
            </button>
            <button onClick={() => setCurrrentBet("8")}>8</button>
            <button onClick={() => setCurrrentBet("9")} id="red">
              9
            </button>
            <button onClick={() => setCurrrentBet("10")}>10</button>
            <button onClick={() => setCurrrentBet("11")}>11</button>
            <button onClick={() => setCurrrentBet("12")} id="red">
              12
            </button>
            <button onClick={() => setCurrrentBet("13")}>13</button>
            <button onClick={() => setCurrrentBet("14")} id="red">
              14
            </button>
            <button onClick={() => setCurrrentBet("15")}>15</button>
            <button onClick={() => setCurrrentBet("16")} id="red">
              16
            </button>
            <button onClick={() => setCurrrentBet("17")}>17</button>
            <button onClick={() => setCurrrentBet("18")} id="red">
              18
            </button>
            <button onClick={() => setCurrrentBet("19")} id="red">
              19
            </button>
            <button onClick={() => setCurrrentBet("20")}>20</button>
            <button onClick={() => setCurrrentBet("21")} id="red">
              21
            </button>
            <button onClick={() => setCurrrentBet("22")}>22</button>
            <button onClick={() => setCurrrentBet("23")} id="red">
              23
            </button>
            <button onClick={() => setCurrrentBet("24")}>24</button>
            <button onClick={() => setCurrrentBet("25")} id="red">
              25
            </button>
            <button onClick={() => setCurrrentBet("26")}>26</button>
            <button onClick={() => setCurrrentBet("27")} id="red">
              27
            </button>
            <button onClick={() => setCurrrentBet("28")}>28</button>
            <button onClick={() => setCurrrentBet("29")}>29</button>
            <button onClick={() => setCurrrentBet("30")} id="red">
              30
            </button>
            <button onClick={() => setCurrrentBet("31")}>31</button>
            <button onClick={() => setCurrrentBet("32")} id="red">
              32
            </button>
            <button onClick={() => setCurrrentBet("33")}>33</button>
            <button onClick={() => setCurrrentBet("34")} id="red">
              34
            </button>
            <button onClick={() => setCurrrentBet("35")}>35</button>
            <button onClick={() => setCurrrentBet("36")} id="red">
              36
            </button>
            <button onClick={() => setCurrrentBet("1st col")}>2 - 1</button>
            <button onClick={() => setCurrrentBet("2nd col")}>2 - 1</button>
            <button onClick={() => setCurrrentBet("3rd col")}>2 - 1</button>
          </div>
        </div>

        <div className="top_bottom">
          <button onClick={() => setCurrrentBet("1st 12")}>1st 12</button>
          <button onClick={() => setCurrrentBet("2nd 12")}>2nd 12</button>
          <button onClick={() => setCurrrentBet("3rd 12")}>3rd 12</button>
        </div>

        <div className="bottom_bottom">
          <button onClick={() => setCurrrentBet("1 - 18")}>1 - 18</button>
          <button onClick={() => setCurrrentBet("Even")}>Even</button>
          <button onClick={() => setCurrrentBet("Red")} id="red">
            Red
          </button>
          <button onClick={() => setCurrrentBet("Black")}>Black</button>
          <button onClick={() => setCurrrentBet("Odd")}>Odd</button>
          <button onClick={() => setCurrrentBet("19 - 36")}>19 - 36</button>
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
            <p> $1000 </p>
          </div>

          <div id="betOutput">
            <p>
              Bet on {currentBet}: ${betValue}
            </p>
            <button onClick={() => clearEntry()}>Clear</button>
            <button onClick={() => setBetList({})}>Clear All</button>
          </div>
        </div>
      )}
    </div>
  );
}
