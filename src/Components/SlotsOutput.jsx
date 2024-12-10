export default function SlotsOutput({ slot1, slot2, slot3 }) {
  return (
    <div className="slot-images">
      <img src={`/images/slot_${slot1}.png`} />
      <img src={`/images/slot_${slot2}.png`} />
      <img src={`/images/slot_${slot3}.png`} />
    </div>
  );
}
