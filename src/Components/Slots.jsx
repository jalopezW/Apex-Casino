import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"
import "./Slots.css"

export default function Slots({score, updateScore}) {

    const scale_list = [2, 5, 10, 25, 50, 75, 100, 200, 500, 1000, 0]
    const [bet, setBet] = useState(0)
    const [betResult, setBetResult] = useState(0)
    const [result, setResult] = useState([10,10,10])
    const [slot1, setSlot1] = useState(10)
    const [slot2, setSlot2] = useState(10)
    const [slot3, setSlot3] = useState(10)
    const [spinOver, setSpinOver] = useState(true)
    const [spinWin, setSpinWin] = useState(false)
    
    
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
            setBetResult(bet*scale_list[result[0]]),
            updateScore(bet*scale_list[result[0]])
        ) : (
            setSpinWin(false),
            setBetResult(bet),
            updateScore(bet * -1)
        )
    }

    useEffect(() => checkSpin(),[result])
    useEffect(() => {spinOver ? (setResult([slot1,slot2,slot3])) : (null)}, [spinOver])

    useEffect(() => {bet > score ? (setBet(score)) : (null)} ,[score])

    return (
        <>
    <div className="slots-body">
        <div className="slots-root">
            <GameHeader title="Slots" score={score}/>
            <div className="slots-container">
                <div className="slot-images">
                    <img src={`/images/slot_${slot1}.png`} width={"50px"} height={"50px"} />
                    <img src={`/images/slot_${slot2}.png`} width={"50px"} height={"50px"} />
                    <img src={`/images/slot_${slot3}.png`} width={"50px"} height={"50px"} />
                </div>
                
                {spinOver ? (
                <>
                <div className="slots-bet">
                    <button className="slots-button" onClick={() => bet >= 10 ?(setBet(bet - 10)) : (setBet(0))}>-</button>
                    <p>{bet}</p>
                    <button className="slots-button" onClick={() => bet < score ? (setBet(bet + 10)) : (setBet(score))}>+</button>
                </div>
                
                
                {bet > 0 ? <button className="slots-button spin-button" onClick={() => spin()}>Spin</button> : <> </>}
                </>
                ) : (<></>)}

                {spinOver && betResult != 0 ? (
                        <p className="slots-result">You {spinWin ? "won" : "lost"}: {betResult}</p>
                    ) : (<></>)}
            </div>
        </div>
    </div>
</>

    )

} 
