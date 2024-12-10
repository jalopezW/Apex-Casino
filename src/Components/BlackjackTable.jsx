export default function BlackjackTable({
  betting,
  drawing,
  dealerCards,
  playerCards,
  addCard,
  dealerTurn,
}) {
  return (
    <div id="blackjack-game-table">
      {!betting && (
        <>
          <div id="dealer-hand">
            {drawing ? (
              <>
                <img src={dealerCards[0]?.image} alt="Dealer card" />
                <img
                  src="https://deckofcardsapi.com/static/img/back.png"
                  alt="Face down card"
                />
              </>
            ) : (
              dealerCards.map((card) => (
                <img key={card.code} src={card.image} alt={card.value} />
              ))
            )}
          </div>
          <div id="player-hand">
            {playerCards.map((card) => (
              <img key={card.code} src={card.image} alt={card.value} />
            ))}
          </div>
          {drawing && (
            <div id="action-area">
              <button onClick={() => addCard("player")}>Hit</button>
              <button onClick={() => dealerTurn()}>Stand</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
