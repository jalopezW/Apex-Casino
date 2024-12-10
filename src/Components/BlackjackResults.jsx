export default function BlackjackResults({
  drawing,
  lose,
  win,
  tie,
  reset,
  dealerScore,
  playerScore,
}) {
  return (
    <div id="results">
      <div id="results-text">
        <h3
          style={{
            color: !drawing ? (lose ? "green" : "red") : "white",
          }}
        >
          {drawing ? "???" : dealerScore}
        </h3>
        <h3>vs</h3>
        <h3
          style={{
            color: !drawing ? (win ? "green" : "red") : "white",
          }}
        >
          {playerScore}
        </h3>
      </div>
      {(lose || win || tie) && (
        <button id="play-again-button" onClick={() => reset()}>
          Play Again
        </button>
      )}
    </div>
  );
}
