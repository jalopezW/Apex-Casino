import { SignIn, SignOutButton } from "./auth";
import ReactPlayer from "react-player";

export default function HomeStats({ user, score, position, updateScore }) {
  return (
    <div className="home-stats">
      {user ? (
        score > 0 ? (
          <>
            <h2>Your Score</h2>
            <p>
              Position: <span>#{position}</span>
            </p>
            <p>
              LionBucks: <span>${score.toLocaleString()}</span>
            </p>
            <SignOutButton />
          </>
        ) : (
          <>
            <h2>Watch an Ad for 1,000 Lion Bucks!</h2>
            <ReactPlayer
              url="https://youtu.be/KT0U_JoxstU?si=kjD6wBt6iK2-HHhG"
              className="video"
              onEnded={() => updateScore(1000)}
            />
            <SignOutButton />
          </>
        )
      ) : (
        <>
          <h2>Sign in to see your stats!</h2>
          <SignIn />
        </>
      )}
    </div>
  );
}
