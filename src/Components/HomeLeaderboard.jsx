export default function HomeLeaderboard({ leaderboard }) {
  return (
    <div className="home-leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {leaderboard.map((player, index) => (
          <li key={index}>
            {index + 1}: {player.Name} - ${player.LionBucks.toLocaleString()}{" "}
          </li>
        ))}
      </ol>
    </div>
  );
}
