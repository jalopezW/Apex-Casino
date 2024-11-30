import BetPlacer from "./BetPlacer"
import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"

export default function Slots() {

    const [bet, setBet] = useState(0)
    const [result, setResult] = useState([10,10,10])
    const [spinWin, setSpinWin] = useState(false)
    const [scoreMult, setScoreMult] = useState(0)
    
    function spin(){
        setResult([Math.floor(Math.random() * 10),Math.floor(Math.random() * 10),Math.floor(Math.random() * 10)])
    }

    function checkSpin(){
        (result[0] === result[1] && result[1] === result[2]) ? (
            setSpinWin(true),
            setScoreMult(result[0])
        ) : (
            setSpinWin(false),
            setScoreMult(0)
        )   
    }

    useEffect(() => checkSpin(),[result])
    return (
        <>
            <GameHeader title ="Slots" />
            <button onClick={() => spin()}>Spin</button>
            {result} {spinWin.toString()}
            <BetPlacer bet={setBet} flag={() => {}} />
        </>
    )

}