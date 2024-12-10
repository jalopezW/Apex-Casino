export default function PokerResults({ win, bet, reset }) {
  return (
    <div id="results">
      {win ? "You win" : "You lose"}: ${bet.toLocaleString()}
      <button onClick={() => reset()}>Play Again</button>
    </div>
  );
}
