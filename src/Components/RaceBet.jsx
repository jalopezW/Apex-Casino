import { useEffect, useState } from "react"


export default function RouletteBet({betList , setBetList}){

    const [currentBet, setCurrrentBet] = useState("")
    const [betValue, setBetValue] = useState(0)

    function updateBet(toAdd){
        var tempBetList = betList
        
        betList.has(currentBet) ? (
            tempBetList.set(currentBet, betList.get(currentBet) + toAdd)
        ) : (
            tempBetList.set(currentBet, toAdd)
        )
        setBetList(tempBetList)
    }

    function clearEntry(){
        var tempBetList = betList

        tempBetList.delete(currentBet)

        setBetList(tempBetList)
    }


    useEffect(() => {setBetValue(betList.get(currentBet))} ,[betList,currentBet])

    return (<>
        <div class="zeros">
        <button onClick={() => setCurrrentBet("Red")}>Red</button>
        <button onClick={() => setCurrrentBet("Blue")}>Blue</button>
        <button onClick={() => setCurrrentBet("Green")}>Green</button>
        </div>


        <footer>
    
    <div id="bet">
    <img onClick={()=> updateBet(1)} src="https://brand.lmu.edu/media/wnmd/brand/identitystandards/marks-ceremonial/lmu-ceremonial-mark.png" width={100} height={100} />
    
    <img onClick={()=> updateBet(5)} src="https://brand.lmu.edu/media/wnmd/brand/identitystandards/marks-ceremonial/lmu-ceremonial-mark.png" width={100} height={100} />
    
    <img onClick={()=> updateBet(25)} src="https://brand.lmu.edu/media/wnmd/brand/identitystandards/marks-ceremonial/lmu-ceremonial-mark.png" width={100} height={100} />
    
    <img onClick={()=> updateBet(100)} src="https://brand.lmu.edu/media/wnmd/brand/identitystandards/marks-ceremonial/lmu-ceremonial-mark.png" width={100} height={100} />
    
    <img onClick={()=> updateBet(500)} src="https://brand.lmu.edu/media/wnmd/brand/identitystandards/marks-ceremonial/lmu-ceremonial-mark.png" width={100} height={100} />
    
    <img onClick={()=> updateBet(1000)} src="https://brand.lmu.edu/media/wnmd/brand/identitystandards/marks-ceremonial/lmu-ceremonial-mark.png" width={100} height={100} />
    
    <p> $1 </p>
    <p> $5 </p>
    <p> $25 </p>
    <p> $100 </p>
    <p> $500 </p>
    <p> $1000 </p>
    </ div>

    <div id="betOutput">
    <p>Bet on {currentBet}: ${betValue}</p>
    <button onClick={()=> clearEntry()}>Clear</button>
    <button onClick={()=> setBetList(new Map())}>Clear All</button>
    </div>




    </footer>

    </>
    )
}