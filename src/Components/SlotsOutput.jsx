export default function SlotsOutput({ slot1, slot2, slot3 }) {
  return (
    <div className="slot-images">
      <img src={`/images/slot_${slot1}.png`} width={"50px"} height={"50px"} />
      <img src={`/images/slot_${slot2}.png`} width={"50px"} height={"50px"} />
      <img src={`/images/slot_${slot3}.png`} width={"50px"} height={"50px"} />
    </div>
  );
}
