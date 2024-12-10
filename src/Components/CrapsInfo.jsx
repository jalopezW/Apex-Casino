export default function CrapsInfo({
  betList,
  rolling,
  roll,
  writtenBet,
  totalWinnings,
  result,
}) {
  return (
    <div id="info-area">
      {Object.keys(betList).length > 0 && (
        <>
          {!rolling && <button onClick={roll}>Roll!</button>}
          <p>Current Placed Bet: {writtenBet}</p>
        </>
      )}
      {!rolling && totalWinnings != 0 && (
        <>
          <p>Last Roll: {result}</p>

          <p>
            {totalWinnings > 0 ? "You won" : "You lost"}: $
            {Math.abs(totalWinnings).toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
}
