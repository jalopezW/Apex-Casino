import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"
import CrapsBet from "./CrapsBet"

export default function Craps({score}) {

    const [betList, setBetList] = useState(new Map())
    const [dice1, setDice1] = useState(1)
    const [dice2, setDice2] = useState(1)
    const [rolling, setRolling] = useState(false)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    async function roll(){
        setRolling(true)
        await sleep(1000)
        setDice1(Math.floor(Math.random() * 6 + 1))
        setDice2(Math.floor(Math.random() * 6 + 1))
        setRolling(false)
    }

    return (
        <>
            <GameHeader title ="Craps" score={score}/>

            <img src={rolling ? ("/images/rolling.gif") : (`/images/craps_${dice1}.png`)} width={"100px"} height={"100px"}/>
            <img src={rolling ? ("/images/rolling.gif") : (`/images/craps_${dice2}.png`)} width={"100px"} height={"100px"}/>


            <button onClick={roll}>Roll!</button>

            <CrapsBet betList={betList} setBetList={setBetList}/>
        </>
    )

}