import CardBetPlacer from "./CardBetPlacer";

export default function PokerBet({ bet, setBet, score, bettingFlag }) {
  return (
    <CardBetPlacer
      bet={(newBet) => setBet(bet + newBet >= score ? score : bet + newBet)}
      flag={bettingFlag}
      score={score}
    />
  );
}
