import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"
import RaceBet from "./RaceBet"
import "./Race.css"

export default function Race() {
    const horses = ["Red","Blue","Green"]
    const [second, setSecond] = useState("")
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = () => {
      setIsMoved(!isMoved);
    };

    const [winners, setWinners] = useState(new Map())
    const [betList, setBetList] = useState(new Map())
    const [over, setOver] = useState(false)
    

    function getWinner(){
        // const firstPlace = Math.floor(Math.random() * horses.length)
        // setWinner(horses[firstPlace])
        // var secondPlace = firstPlace
        // while (firstPlace == secondPlace){
        //     secondPlace = Math.floor(Math.random() * horses.length)
        // }
        // setSecond(horses[secondPlace])

        const result = new Map()
        const copy = [...horses];

        while (result.size < 3) {
            const randomIndex = Math.floor(Math.random() * copy.length);
            const chosenElement = copy.splice(randomIndex, 1)[0];
            result.set(chosenElement,result.size+1)
        }
        setOver(true)
        setIsMoved(!isMoved)
        setWinners(result)
        
        
    }

    function placeToSeconds(place){
        return over ? (place === 1 ? (
                1
        ) : place === 2 ? (
                2
        ) : (
                3
        )) : (0)
    }

    function reset(){
        setOver(false)
        setIsMoved(!isMoved)
    }

    return (
        <>
            <GameHeader title ="Race" />
            <div id="horses">
            <img src="/images/redHorse.png" width={"100px"} height={"100px"} style={{ 
            transition: `transform ${placeToSeconds(winners.get("Red"))}s linear`,
            transform: isMoved ? 'translateX(500px)' : 'translateX(0)' 
            }}/>
            <img src="/images/blueHorse.png" width={"100px"} height={"100px"} style={{ 
            transition: `transform ${placeToSeconds(winners.get("Blue"))}s linear`,
            transform: isMoved ? 'translateX(500px)' : 'translateX(0)' 
            }}/>
            <img src="/images/greenHorse.png" width={"100px"} height={"100px"} style={{ 
            transition: `transform ${placeToSeconds(winners.get("Green"))}s linear`,
            transform: isMoved ? 'translateX(500px)' : 'translateX(0)' 
            }}/>
            </div>





            {over ? (<button onClick={reset}>Reset</button>) : (<button onClick={getWinner}>Race!</button>)}
            
            <RaceBet betList={betList} setBetList={setBetList}/>
        </>
    )

}