import BetPlacer from "./BetPlacer"
import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"
import "./Slots.css"

export default function Slots() {

    const [bet, setBet] = useState(0)
    const [result, setResult] = useState([10,10,10])
    const [slot1, setSlot1] = useState(10)
    const [slot2, setSlot2] = useState(10)
    const [slot3, setSlot3] = useState(10)
    const [spinOver, setSpinOver] = useState(false)
    const [spinWin, setSpinWin] = useState(false)
    const [scoreMult, setScoreMult] = useState(0)
    
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async function spin(){
        setSpinOver(false)
        indSpin(20,setSlot1)
        indSpin(40,setSlot2)
        await indSpin(60,setSlot3)
        setSpinOver(true)
    }

    async function indSpin(iterations, setter){
        var endSlot = Math.floor(Math.random() * 10)
        var currentSlot = 0
        var s = 0
        while (s < iterations){
            currentSlot = await tempSpin(currentSlot,setter)
            s += 1
        }
        while (currentSlot != endSlot){
            currentSlot = await tempSpin(currentSlot,setter)
        }
    }

    async function tempSpin(currentSlot, setter) {
        await sleep(50) 
        currentSlot = (currentSlot +1) % 10
        setter(currentSlot)
        return currentSlot
    }

    function checkSpin() {

        (result[0] === result[1] && result[1] === result[2]) ? (
            setSpinWin(true),
            setScoreMult(result[0])
        ) : (
            setSpinWin(false),
            setScoreMult(0)
        )
        
    }

    function endSpin(){
        setResult([slot1,slot2,slot3])
    }
 

    useEffect(() => checkSpin(),[result])
    useEffect(() => endSpin(),[spinOver])

    return (
        <>
    <div className="slots-body">
        <div className="slots-root">
            <GameHeader title="Slots" />
            <div className="slots-container">
                <div className="slot-images">
                    <img src={`/images/slot_${slot1}.png`} width={"50px"} height={"50px"} />
                    <img src={`/images/slot_${slot2}.png`} width={"50px"} height={"50px"} />
                    <img src={`/images/slot_${slot3}.png`} width={"50px"} height={"50px"} />
                </div>
                
                <div className="slots-bet">
                    <button className="slots-button" onClick={() => setBet(bet - 10)}>-</button>
                    <p>{bet}</p>
                    <button className="slots-button" onClick={() => setBet(bet + 10)}>+</button>
                </div>
                
                <button className="slots-button spin-button" onClick={() => spin()}>Spin</button>

                {spinOver ? (
                    spinWin ? (
                        <p className="slots-result">You won: {bet}</p>
                    ) : (
                        <p className="slots-result">You lost: {bet}</p>
                    )
                ) : (<></>)}
            </div>
        </div>
    </div>
</>

    )

} 
