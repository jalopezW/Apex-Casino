import { useEffect, useState } from "react";
import GameHeader from "./GameHeader";
import SlotsOutput from "./SlotsOutput";
import SlotsBet from "./SlotsBet";
import SlotsResult from "./SlotsResult";
import "./Slots.css";

export default function Slots({ score, updateScore, user }) {
  const scale_list = [2, 5, 10, 25, 50, 75, 100, 200, 500, 1000, 0];
  const [bet, setBet] = useState(0);
  const [betResult, setBetResult] = useState(0);
  const [result, setResult] = useState([10, 10, 10]);
  const [slot1, setSlot1] = useState(10);
  const [slot2, setSlot2] = useState(10);
  const [slot3, setSlot3] = useState(10);
  const [spinOver, setSpinOver] = useState(true);
  const [spinWin, setSpinWin] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function Spin() {
    setSpinOver(false);
    indSpin(20, setSlot1);
    indSpin(40, setSlot2);
    await indSpin(60, setSlot3);
    setSpinOver(true);
  }

  async function indSpin(iterations, setter) {
    var endSlot = Math.floor(Math.random() * 10);
    var currentSlot = 0;
    var s = 0;
    while (s < iterations) {
      currentSlot = await tempSpin(currentSlot, setter);
      s += 1;
    }
    while (currentSlot != endSlot) {
      currentSlot = await tempSpin(currentSlot, setter);
    }
  }

  async function tempSpin(currentSlot, setter) {
    await sleep(50);
    currentSlot = (currentSlot + 1) % 10;
    setter(currentSlot);
    return currentSlot;
  }

  function checkSpin() {
    result[0] === result[1] && result[1] === result[2]
      ? (setSpinWin(true),
        setBetResult(bet * scale_list[result[0]]),
        updateScore(bet * scale_list[result[0]]))
      : (setSpinWin(false), setBetResult(bet), updateScore(bet * -1));
  }

  useEffect(() => checkSpin(), [result]);
  useEffect(() => {
    spinOver ? setResult([slot1, slot2, slot3]) : null;
  }, [spinOver]);

  useEffect(() => {
    bet > score ? setBet(score) : null;
  }, [score]);

  return (
    <>
      <div className="slots-body">
        <div className="slots-root">
          <GameHeader title="🎰 Slots 🎰" score={score} />
          <div className="slots-container">
            <SlotsOutput slot1={slot1} slot2={slot2} slot3={slot3} />

            <SlotsBet user={user} spinOver={spinOver} bet={bet} Spin={Spin} />

            {spinOver && betResult != 0 && (
              <SlotsResult spinWin={spinWin} betResult={betResult} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
