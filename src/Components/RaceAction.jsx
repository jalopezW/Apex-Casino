export default function RaceAction({
  over,
  winner,
  betList,
  reset,
  getWinner,
}) {
  return (
    <>
      {over ? (
        <div id="over-text">
          <p>{winner} wins!</p>

          {winner in betList ? (
            <p>You win ${betList[winner].toLocaleString()}</p>
          ) : (
            <p>You lost ${Object.values(betList)[0].toLocaleString()}</p>
          )}
          <button id="reset-button" onClick={reset}>
            Play Again
          </button>
        </div>
      ) : (
        Object.keys(betList).length > 0 && (
          <button id="race-button" onClick={getWinner}>
            Race!
          </button>
        )
      )}
    </>
  );
}
