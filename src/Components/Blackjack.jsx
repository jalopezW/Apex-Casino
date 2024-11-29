import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"
import { getDeck, getCard } from "../Services/cardService"
import BetPlacer from "./BetPlacer"

export default function Blackjack() {

    const [betting, setBetting] = useState(true)
    const [bet, setBet] = useState(0)
    const [currentDeck, setCurrentDeck] = useState("")
    const [playerCards, setPlayerCards] = useState([])
    const [dealerCards, setDealerCards] = useState([])
    const [drawing, setDrawing] = useState(false)
    const [playerScore, setPlayerScore] = useState(0)
    const [dealerScore, setDealerScore] = useState(0)
    const [lose, setLose] = useState(false)
    const [win, setWin] = useState(false)
    const [tie, setTie] = useState(false)


    async function bettingFlag(){
        //link to database
        setBetting(false)
        await startBehavior()
        setDrawing(true)
    }

    async function startBehavior(){
        //const deck = await getDeck()
        //setCurrentDeck(await getDeck())
        var deck = ""
        var pCards = []
        var dCards= []
        await getDeck().then((id) => deck = id)
        await getCard(deck).then((card)=> pCards = [...pCards, ...card])
        await getCard(deck).then((card)=> pCards = [...pCards, ...card])
        await getCard(deck).then((card)=> dCards = [...dCards, ...card])
        await getCard(deck).then((card)=> dCards = [...dCards, ...card])
        //console.log(currentDeck)
        //addCard("player")
        //setPlayerCards([await getCard(currentDeck), await getCard(currentDeck)])
        //setDealerCards([await getCard(currentDeck), await getCard(currentDeck)])
        //console.log(playerCards)
        //console.log(dealerCards)
        setCurrentDeck(deck)
        setPlayerCards(pCards)
        setDealerCards(dCards)
    }
    
    async function addCard(whom){
        whom === "player" ? (
            await getCard(currentDeck).then((card)=> setPlayerCards([...playerCards, ...card]))
        ) : (
            await getCard(currentDeck).then((card)=> setDealerCards([...dealerCards, ...card]))
        )


    }

    function dealerTurn(){
        setDrawing(false)
        if (dealerScore < 17){
            addCard("dealer")
        } else {
            endGame()
        }
    }

    function endGame(){
        playerScore > dealerScore ? (
            setWin(true)
        ) : playerScore < dealerScore ? (
            setLose(true)
        ) : (
            setTie(true)
        )
    }

    useEffect (() => {setPlayerScore(playerCards.map(getScore).reduce((a, b) => a + b,0))}, [playerCards])
    useEffect (() => {setDealerScore(dealerCards.map(getScore).reduce((a, b) => a + b,0))}, [dealerCards])
    useEffect (() => {playerScore > 21 ? (setLose(true)) : (null)}, [playerScore])
    useEffect (() => {dealerScore > 21 ? (setWin(true)) : ( (!drawing && dealerScore < 17) ? (addCard("dealer")) : ((!drawing && 17 <= dealerScore <= 21) ? (endGame()): (null)))}, [dealerScore])

    function getScore(card){
        const value = card.value
        if (value === "ACE"){
            // fix
            return 1
        } else if (value === "JACK" || value === "QUEEN" || value === "KING") {
            return 10
        } else {
            return Number(value)
        }
    }

    return (
        <>
            <GameHeader title ="Blackjack" />
            {betting ?(
                <BetPlacer bet={setBet} flag={() => bettingFlag()}/>

                // <form onSubmit={placeBet}>
                // <h1>Place your bet: </h1>
                // <input type ="number" onChange={(e) => setBet(e.target.value)}/>
                // </form>
            ): (lose === win && win === tie) ? (<> 

                <div id="dealerCards">
                    {drawing ? (<>
                    <p>dealer:</p>
                    <img src={dealerCards[0].image} />
                    <img src='https://deckofcardsapi.com/static/img/back.png' />
                    </>):(<>
                    <p>dealer: {dealerScore}</p>
                    {dealerCards && dealerCards.map((card) => (
                        <div key={card.code}>
                        <img src={card.image} />
                        </div>))
                    }
                    </>)}
                    
                </div>
                <div id="playerCards">
                    <p>player: {playerScore}</p>
                    {playerCards && playerCards.map((card) => (
                        <div key={card.code}>
                        <img src={card.image} />
                        </div>))
                    }
                </div>
                {drawing ? (<>
                    <button onClick={() => addCard("player")}>hit</button>
                    <button onClick={() => dealerTurn()}>stand</button>
                </>) : ( <> </>

                )}
            
            </>) : ( <>
                {lose ? (
                    <p> you lose</p>
                ) : win ?(
                    <p> you win</p>
                ): (
                    <p> tie</p>
                )}
                <p>final player: {playerScore}</p>
                <p>final dealer: {dealerScore}</p>
            </>)}
        </>
    )
}