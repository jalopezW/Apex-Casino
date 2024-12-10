export default function SlotsResult({ spinWin, betResult }) {
  return (
    <p className="slots-result">
      {spinWin ? "🤑 JACKPOT 🤑 YOU WIN" : "You lost"}: $
      {betResult.toLocaleString()}
    </p>
  );
}
