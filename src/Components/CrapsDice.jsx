export default function CrapsDice({ rolling, dice1, dice2 }) {
  return (
    <div id="dice">
      <img
        src={rolling ? "/images/rolling.gif" : `/images/craps_${dice1}.png`}
        width={"200px"}
        height={"200px"}
      />
      <img
        src={rolling ? "/images/rolling.gif" : `/images/craps_${dice2}.png`}
        width={"200px"}
        height={"200px"}
      />
    </div>
  );
}
