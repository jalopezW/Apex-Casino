import GameHeader from "./GameHeader"
import { useEffect, useState } from "react"
import { getDeck, getCard } from "../Services/cardService"
import BetPlacer from "./BetPlacer"
import "./Blackjack.css"

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
        await startBehavior()
        setBetting(false)
        setDrawing(true)
    }

    async function startBehavior(){
        var deck = ""
        var pCards = []
        var dCards= []
        await getDeck().then((id) => deck = id)
        await getCard(deck).then((card)=> pCards = [...pCards, ...card])
        await getCard(deck).then((card)=> pCards = [...pCards, ...card])
        await getCard(deck).then((card)=> dCards = [...dCards, ...card])
        await getCard(deck).then((card)=> dCards = [...dCards, ...card])
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

    function getCardScore(card){
        const value = card.value
        if (value === "ACE"){
            return 11
        } else if (value === "JACK" || value === "QUEEN" || value === "KING") {
            return 10
        } else {
            return Number(value)
        }
    }

    function getScore(cards){
        var preScore = cards.map(getCardScore).reduce((a, b) => a + b,0)
        const aces = cards.filter(card => card.value === "ACE").length

        if (preScore > 21) {
            preScore = preScore - aces*10
        }
        return preScore
    }

    function reset(){
        setBetting(true)
        setBet(0)
        setCurrentDeck("")
        setPlayerCards([])
        setDealerCards([])
        setDrawing(false)
        setPlayerScore(0)
        setDealerScore(0)
        setLose(false)
        setWin(false)
        setTie(false)
    }

    useEffect (() => {setPlayerScore(getScore(playerCards))}, [playerCards]) 
    useEffect (() => {setDealerScore(getScore(dealerCards))}, [dealerCards])
    useEffect (() => {playerScore > 21 ? (setLose(true)) : (null)}, [playerScore])
    useEffect (() => {dealerScore > 21 ? (setWin(true)) : ( (!drawing && dealerScore < 17) ? (() => addCard("dealer")) : ((!drawing && 17 <= dealerScore <= 21) ? (endGame()): (null)))}, [dealerScore])

    return (
        <div id="blackjack">
            
            <GameHeader title ="Blackjack" />
            
            <div id="middle">

            <div id="table">
                {!betting ? (
                <div>
                    <div id="dealerCards">
                    {drawing ? (<>
                    <img src={dealerCards[0].image} />
                    <img src='https://deckofcardsapi.com/static/img/back.png' />
                    </>):(<>
                    {dealerCards && dealerCards.map((card) => (
                        <div key={card.code}>
                        <img src={card.image} />
                        </div>))
                    }
                    </>)}    
                    </div>
                <div id="playerCards">
                    {playerCards && playerCards.map((card) => (
                        <div key={card.code}>
                        <img src={card.image} />
                        </div>))
                    }
                </div>
                {drawing ? (<>
                    <div>
                    <button onClick={() => addCard("player")}>hit</button>
                    <button onClick={() => dealerTurn()}>stand</button>
                    </div>
                </>) : ( <> </>)}
                </div>) : (<></>)}
            </div>

            <div id="results">
            {betting ? (<></>) : (
                <div>
                {drawing ? (<p>???</p>) : (<p>{dealerScore}</p>)}
                <p>vs</p>
                <p>{playerScore}</p>
                {!(lose === win && win === tie) ? (<button onClick={() => reset()}>Play Again</button>) : (<></>)}
                </div>
            )}
            </div>
            
            </div>
            
            <div id="bottom">
                {betting ?(
                    <BetPlacer bet={setBet} flag={() => bettingFlag()}/>
                ) : (lose === win && win === tie) ? (
                    <h2>Current Bet: ${bet}</h2>
                ) : (
                    lose ? (
                        <p>You Lost ${bet}</p>
                    ) : win ?(
                        <p>You Win ${bet}</p>
                    ): (
                        <p>Push!</p>
                    )
                )}
            </div>

        </div>
    )
}