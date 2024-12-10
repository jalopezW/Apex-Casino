import CardBetPlacer from "./CardBetPlacer";

export default function BlackjackBet({
  betting,
  lose,
  win,
  tie,
  bet,
  setBet,
  bettingFlag,
  score,
}) {
  return (
    <div id="betting-section">
      {betting ? (
        <CardBetPlacer bet={setBet} flag={bettingFlag} score={score} />
      ) : lose ? (
        <p>You Lost ${bet.toLocaleString()}</p>
      ) : win ? (
        <p>You Win ${bet.toLocaleString()}</p>
      ) : tie ? (
        <p>Push!</p>
      ) : (
        <h2>Current Bet: ${bet.toLocaleString()}</h2>
      )}
    </div>
  );
}
