export default function SlotsBet({ user, spinOver, bet, Spin, score, setBet }) {
  return (
    <>
      {user && spinOver && (
        <>
          <div className="slots-bet">
            <button
              className="slots-button"
              onClick={() => (bet >= 10 ? setBet(bet - 10) : setBet(0))}
            >
              -
            </button>
            <p>${bet.toLocaleString()}</p>
            <button
              className="slots-button"
              onClick={() =>
                bet + 10 < score ? setBet(bet + 10) : setBet(score)
              }
            >
              +
            </button>
          </div>

          {bet > 0 && (
            <button className="spin-button" onClick={() => Spin()}>
              Spin
            </button>
          )}
        </>
      )}
    </>
  );
}
