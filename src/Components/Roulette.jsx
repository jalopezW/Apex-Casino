import GameHeader from "./GameHeader"
import RouletteBet from "./RouletteBet"
import { useEffect, useState } from "react"

export default function Roulette() {
    
    const possibilities = ['0', '00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
    const red = ['1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36']
    
    const [spinValue, setSpinValue] = useState("37")
    const [winners, setWinners] = useState([])
    const [betList, setBetList] = useState(new Map())

    function Spin (){
        const randomIndex = Math.floor(Math.random() * possibilities.length)
        setSpinValue(possibilities[randomIndex])
      };
    
    function getWinners(){
        var tempWinners = []
        var spinNum = Number(spinValue)
        
        tempWinners.push(spinValue)

        spinNum < 13 ? (
            tempWinners.push("1st 12")
        ) : spinNum < 25 ? (
            tempWinners.push("2nd 12")
        ) : (
            tempWinners.push("3rd 12")
        )

        spinNum % 2 === 0 ?(
            tempWinners.push("Even")
        ) : (
            tempWinners.push("Odd")
        )

        spinNum < 19 ? (
            tempWinners.push("1 - 18")
        ) : (
            tempWinners.push("19 - 36")
        )

        red.includes(spinValue) ? (
            tempWinners.push("Red")
        ) : (
            tempWinners.push("Black")
        )

        spinNum % 3 === 0 ? (
            tempWinners.push("3rd col")
        ) : spinNum % 3 === 1 ? (
            tempWinners.push("1st col")
        ) : (
            tempWinners.push("2nd col")
        )

        setWinners(tempWinners)
    }


    useEffect(() => getWinners(), [spinValue])

    return (
        <>
            <GameHeader title ="Roulette" />
            
            {spinValue < 37 ? (
                <>{spinValue}       {winners}</>
            ) : (
                <></>
            )}
            <div class="Roulette">
            <button onClick={() => Spin()}> spin</button>

            <RouletteBet betList={betList} setBetList={setBetList}/>
            </div>
             </>
    )

}