import HomeHeader from "./HomeHeader";
import HomeButtons from "./HomeButtons";
import HomeLeaderboard from "./HomeLeaderboard";
import HomeStats from "./HomeStats";
import "./Home.css";

export default function Home({
  score,
  user,
  leaderboard,
  position,
  updateScore,
}) {
  return (
    <div className="home">
      <HomeHeader />

      <HomeLeaderboard leaderboard={leaderboard} />

      <HomeStats
        user={user}
        score={score}
        position={position}
        updateScore={updateScore}
      />

      <HomeButtons />
    </div>
  );
}
