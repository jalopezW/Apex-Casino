export default function RaceHorses({ winners, placeToSeconds, isMoved }) {
  return (
    <div id="horses">
      <img
        src="/images/redHorse.png"
        width={"100px"}
        height={"100px"}
        style={{
          transition: `transform ${placeToSeconds(winners["Red"])}s linear`,
          transform: isMoved ? "translateX(1000px)" : "translateX(0)",
        }}
      />
      <img
        src="/images/blueHorse.png"
        width={"100px"}
        height={"100px"}
        style={{
          transition: `transform ${placeToSeconds(winners["Blue"])}s linear`,
          transform: isMoved ? "translateX(1000px)" : "translateX(0)",
        }}
      />
      <img
        src="/images/greenHorse.png"
        width={"100px"}
        height={"100px"}
        style={{
          transition: `transform ${placeToSeconds(winners["Green"])}s linear`,
          transform: isMoved ? "translateX(1000px)" : "translateX(0)",
        }}
      />
    </div>
  );
}
