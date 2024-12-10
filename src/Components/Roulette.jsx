import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import GameHeader from "./GameHeader";
import RouletteBet from "./RouletteBet";
import RouletteAction from "./RouletteAction";
import "./Roulette.css";

export default function Roulette({ score, updateScore, user }) {
  const possibilities = [
    { option: "0" },
    { option: "28" },
    { option: "9" },
    { option: "26" },
    { option: "30" },
    { option: "11" },
    { option: "7" },
    { option: "20" },
    { option: "32" },
    { option: "17" },
    { option: "5" },
    { option: "22" },
    { option: "34" },
    { option: "15" },
    { option: "3" },
    { option: "24" },
    { option: "36" },
    { option: "13" },
    { option: "1" },
    { option: "00" },
    { option: "27" },
    { option: "10" },
    { option: "25" },
    { option: "29" },
    { option: "12" },
    { option: "8" },
    { option: "19" },
    { option: "31" },
    { option: "18" },
    { option: "6" },
    { option: "21" },
    { option: "33" },
    { option: "16" },
    { option: "4" },
    { option: "23" },
    { option: "35" },
    { option: "14" },
    { option: "2" },
  ];

  const red = [
    "1",
    "3",
    "5",
    "7",
    "9",
    "12",
    "14",
    "16",
    "18",
    "19",
    "21",
    "23",
    "25",
    "27",
    "30",
    "32",
    "34",
    "36",
  ];
  const colors = [
    "green",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "green",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
    "red",
    "black",
  ];

  const [spinValue, setSpinValue] = useState("37");
  const [winners, setWinners] = useState([]);
  const [betList, setBetList] = useState({});
  const [resultScore, setResultScore] = useState(0);
  const [mustSpin, setMustSpin] = useState(false);
  const [writtenBet, setWrittenBet] = useState("");
  const [prizeIndex, setPrizeIndex] = useState(0);

  function spin() {
    const randomIndex = Math.floor(Math.random() * possibilities.length);
    setMustSpin(true);
    setPrizeIndex(randomIndex);
    setSpinValue("37");
  }

  function getWinners() {
    const tempWinners = [];
    const spinNum = Number(spinValue);

    tempWinners.push(spinValue);

    spinNum < 13
      ? tempWinners.push("1st 12")
      : spinNum < 25
      ? tempWinners.push("2nd 12")
      : tempWinners.push("3rd 12");

    spinNum % 2 === 0 ? tempWinners.push("Even") : tempWinners.push("Odd");

    spinNum < 19 ? tempWinners.push("1 - 18") : tempWinners.push("19 - 36");

    red.includes(spinValue)
      ? tempWinners.push("Red")
      : spinValue == "0" || spinValue == "00"
      ? tempWinners.push("Green")
      : tempWinners.push("Black");

    spinNum % 3 === 0
      ? tempWinners.push("3rd col")
      : spinNum % 3 === 1
      ? tempWinners.push("1st col")
      : tempWinners.push("2nd col");

    setWinners(tempWinners);
  }

  function getScore() {
    const scores = Object.keys(betList).map((key) =>
      winners.includes(key)
        ? key.slice(4) == "col" || key.slice(4) == "12"
          ? betList[key] * 2
          : key[-4] == "-" ||
            key == "Red" ||
            key == "Black" ||
            key == "Odd" ||
            key == "Even"
          ? betList[key]
          : betList[key] * 35
        : betList[key] * -1
    );
    const finalScore = scores.reduce((a, b) => a + b, 0);
    setResultScore(finalScore);
    updateScore(finalScore);
    setBetList({});
    setWrittenBet("");
  }

  function updateBet(newBet) {
    setBetList(newBet);
    setWrittenBet(
      Object.keys(newBet).map(
        (key) => `${key} = $${newBet[key].toLocaleString()} `
      )
    );
  }

  function spinComplete() {
    setSpinValue(possibilities[prizeIndex].option);
    setMustSpin(false);
  }

  useEffect(() => {
    spinValue != "37" && getWinners();
  }, [spinValue]);

  useEffect(() => getScore(), [winners]);

  return (
    <div id="roulette-body">
      <GameHeader title="🔴 Roulette ⚫" score={score} />
      <div className="roulette">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={possibilities}
          backgroundColors={colors}
          textColors={["white"]}
          onStopSpinning={spinComplete}
          fontSize={20}
          perpendicularText={true}
          textDistance={90}
        />
        <RouletteAction
          writtenBet={writtenBet}
          Spin={spin}
          spinValue={spinValue}
          winners={winners}
          resultScore={resultScore}
        />
      </div>

      {user && !mustSpin && (
        <RouletteBet betList={betList} setBetList={updateBet} score={score} />
      )}
    </div>
  );
}
