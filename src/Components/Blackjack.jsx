import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"
import { getDeck, getCard } from "../Services/cardService"

export default function Blackjack() {

    const [betting, setBetting] = useState(true)
    const [bet, setBet] = useState(0)
    const [currentDeck, setCurrentDeck] = useState("nope")
    const [playerCards, setPlayerCards] = useState([])
    const [dealerCards, setDealerCards] = useState([])
    const [drawing, setDrawing] = useState(false)

    function placeBet(e){
        e.preventDefault()
        //link to database
        setBetting(false)
        setDrawing(true)
    }

    async function startingDraw(){
        //const deck = await getDeck()
        //setCurrentDeck(await getDeck())
        getDeck().then(setCurrentDeck)
        console.log(currentDeck)
        //setPlayerCards([await getCard(currentDeck), await getCard(currentDeck)])
        //setDealerCards([await getCard(currentDeck), await getCard(currentDeck)])
        //console.log(playerCards)
        //console.log(dealerCards)
        setDrawing(false)

    }

    function scoreConvert(){

    }

    return (
        <>
            <GameHeader title ="Blackjack" />
            {betting ?(
                <form onSubmit={placeBet}>
                <h1>Place your bet: </h1>
                <input type ="number" onChange={(e) => setBet(e.target.value)}/>
                </form>
            ): drawing ?(<> 

                <button onClick={() => startingDraw()}>test</button>

            
            </>) : (<></>)}
        </>
    )
}