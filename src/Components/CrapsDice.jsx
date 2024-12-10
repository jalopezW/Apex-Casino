export default function CrapsDice({ rolling, dice1, dice2 }) {
  return (
    <div id="dice">
      <img
        src={rolling ? "/images/rolling.gif" : `/images/craps_${dice1}.png`}
      />
      <img
        src={rolling ? "/images/rolling.gif" : `/images/craps_${dice2}.png`}
      />
    </div>
  );
}
