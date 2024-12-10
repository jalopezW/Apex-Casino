export default function PokerTable({
  round,
  botCards,
  communityCards,
  playerCards,
  betting,
  endGame,
  setRound,
  setBetting,
  bet,
}) {
  return (
    <div id="game-table">
      {round > 0 && (
        <>
          <div id="enemy-cards">
            {!(round > 3) ? (
              <>
                <img
                  src="https://deckofcardsapi.com/static/img/back.png"
                  alt="Face down card"
                />
                <img
                  src="https://deckofcardsapi.com/static/img/back.png"
                  alt="Face down card"
                />
              </>
            ) : (
              botCards.map((card) => (
                <img key={card.code} src={card.image} alt={card.value} />
              ))
            )}
          </div>
          <div id="community-cards">
            <img src={communityCards[0].image} />
            <img src={communityCards[1].image} />
            <img src={communityCards[2].image} />
            <img
              src={
                round > 1
                  ? communityCards[3].image
                  : "https://deckofcardsapi.com/static/img/back.png"
              }
            />
            <img
              src={
                round > 2
                  ? communityCards[4].image
                  : "https://deckofcardsapi.com/static/img/back.png"
              }
            />
          </div>
          <div id="player-cards">
            {playerCards.map((card) => (
              <img key={card.code} src={card.image} alt={card.value} />
            ))}
          </div>
          {!betting && !(round > 3) && (
            <div id="player-buttons">
              <button
                onClick={() => {
                  endGame(true);
                }}
              >
                Fold
              </button>
              <button
                onClick={() => {
                  setRound(round + 1);
                }}
              >
                Check
              </button>
              <button
                onClick={() => {
                  setBetting(true);
                }}
              >
                Bet
              </button>
            </div>
          )}
          <p>Current Pot: ${(bet * 2).toLocaleString()}</p>
        </>
      )}
    </div>
  );
}
