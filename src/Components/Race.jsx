import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"
import RaceBet from "./RaceBet"

export default function Race() {
    const horses = ["Red","Blue","Green"]

    const [winner, setWinner] = useState("")
    const [betList, setBetList] = useState(new Map())
    

    function getWinner(){
        const randomIndex = Math.floor(Math.random() * horses.length)
        setWinner(horses[randomIndex])
    }

    return (
        <>
            <GameHeader title ="Race" />
            <button onClick={getWinner}>Race!</button>
            {winner}
            <RaceBet betList={betList} setBetList={setBetList}/>


        </>
    )

}