import "./Home.css";
import HomeHeader from "./HomeHeader";
import HomeButtons from "./HomeButtons";
import HomeLeaderboard from "./HomeLeaderboard";
import HomeStats from "./HomeStats";

export default function Home({ score, user, leaderboard, position }) {
  return (
    <div className="home">
      <HomeHeader />

      <div className="stats-container">
        {/*replace with grid */}
        <HomeLeaderboard leaderboard={leaderboard} />
        <HomeStats user={user} score={score} position={position} />
      </div>

      <HomeButtons />
    </div>
  );
}
