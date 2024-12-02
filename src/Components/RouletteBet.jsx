import { useEffect, useState } from "react"
import "./Roulette.css"


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
        <div class="top">
        <div class="zeros">
        <button onClick={() => setCurrrentBet("0")}>0</button>
        <button onClick={() => setCurrrentBet("00")}>00</button>
        </div>

        <div class="middle">
        <button onClick={() => setCurrrentBet("1")}>1</button>
        <button onClick={() => setCurrrentBet("2")}>2</button>
        <button onClick={() => setCurrrentBet("3")}>3</button>
        <button onClick={() => setCurrrentBet("4")}>4</button>
        <button onClick={() => setCurrrentBet("5")}>5</button>
        <button onClick={() => setCurrrentBet("6")}>6</button>
        <button onClick={() => setCurrrentBet("7")}>7</button>
        <button onClick={() => setCurrrentBet("8")}>8</button>
        <button onClick={() => setCurrrentBet("9")}>9</button>
        <button onClick={() => setCurrrentBet("10")}>10</button>
        <button onClick={() => setCurrrentBet("11")}>11</button>
        <button onClick={() => setCurrrentBet("12")}>12</button>
        <button onClick={() => setCurrrentBet("13")}>13</button>
        <button onClick={() => setCurrrentBet("14")}>14</button>
        <button onClick={() => setCurrrentBet("15")}>15</button>
        <button onClick={() => setCurrrentBet("16")}>16</button>
        <button onClick={() => setCurrrentBet("17")}>17</button>
        <button onClick={() => setCurrrentBet("18")}>18</button>
        <button onClick={() => setCurrrentBet("19")}>19</button>
        <button onClick={() => setCurrrentBet("20")}>20</button>
        <button onClick={() => setCurrrentBet("21")}>21</button>
        <button onClick={() => setCurrrentBet("22")}>22</button>
        <button onClick={() => setCurrrentBet("23")}>23</button>
        <button onClick={() => setCurrrentBet("24")}>24</button>
        <button onClick={() => setCurrrentBet("25")}>25</button>
        <button onClick={() => setCurrrentBet("26")}>26</button>
        <button onClick={() => setCurrrentBet("27")}>27</button>
        <button onClick={() => setCurrrentBet("28")}>28</button>
        <button onClick={() => setCurrrentBet("29")}>29</button>
        <button onClick={() => setCurrrentBet("30")}>30</button>
        <button onClick={() => setCurrrentBet("31")}>31</button>
        <button onClick={() => setCurrrentBet("32")}>32</button>
        <button onClick={() => setCurrrentBet("33")}>33</button>
        <button onClick={() => setCurrrentBet("34")}>34</button>
        <button onClick={() => setCurrrentBet("35")}>35</button>
        <button onClick={() => setCurrrentBet("36")}>36</button>
        <button onClick={() => setCurrrentBet("1st col")}>2 - 1</button>
        <button onClick={() => setCurrrentBet("2nd col")}>2 - 1</button>
        <button onClick={() => setCurrrentBet("3rd col")}>2 - 1</button>
        </div>

        </div>

        <div class="top_bottom">
        <button onClick={() => setCurrrentBet("1st 12")}>1st 12</button>
        <button onClick={() => setCurrrentBet("2nd 12")}>2nd 12</button>
        <button onClick={() => setCurrrentBet("3rd 12")}>3rd 12</button>
        </div>

        <div class="bottom_bottom">
        <button onClick={() => setCurrrentBet("1 - 18")}>1 - 18</button>
        <button onClick={() => setCurrrentBet("Even")}>Even</button>
        <button onClick={() => setCurrrentBet("Red")}>Red</button>
        <button onClick={() => setCurrrentBet("Black")}>Black</button>
        <button onClick={() => setCurrrentBet("Odd")}>Odd</button>
        <button onClick={() => setCurrrentBet("19 - 36")}>19 - 36</button>
        </div>


        <footer>
    
    <div id="bet">
    <img onClick={()=> updateBet(1)} src={"/images/White.png"} width={100} height={100} />
    
    <img onClick={()=> updateBet(5)} src={"/images/Red.png"} width={100} height={100} />
    
    <img onClick={()=> updateBet(25)} src={"/images/Green.png"} width={100} height={100} />
    
    <img onClick={()=> updateBet(100)} src={"/images/Black.png"} width={100} height={100} />
    
    <img onClick={()=> updateBet(500)} src={"/images/Purple.png"} width={100} height={100} />
    
    <img onClick={()=> updateBet(1000)} src={"/images/Orange.png"} width={100} height={100} />
    
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