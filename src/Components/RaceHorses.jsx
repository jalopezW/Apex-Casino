export default function RaceHorses({ winners, placeToSeconds, isMoved }) {
  return (
    <div id="horses">
      <img
        src="/images/redHorse.png"
        style={{
          transition: `transform ${placeToSeconds(winners["Red"])}s linear`,
          transform: isMoved ? "translateX(70vw)" : "translateX(0)",
        }}
      />
      <img
        src="/images/blueHorse.png"
        style={{
          transition: `transform ${placeToSeconds(winners["Blue"])}s linear`,
          transform: isMoved ? "translateX(70vw)" : "translateX(0)",
        }}
      />
      <img
        src="/images/greenHorse.png"
        style={{
          transition: `transform ${placeToSeconds(winners["Green"])}s linear`,
          transform: isMoved ? "translateX(70vw)" : "translateX(0)",
        }}
      />
    </div>
  );
}
